/* eslint import/prefer-default-export: off */

import clone from 'clone';
import livesplitCore from 'livesplit-core';
import { msToTimeStr, processAck, timeStrToMS } from './util/helpers';
import { get } from './util/nodecg';
import { timer as timerRep, finishTimes } from './util/replicants';

const nodecg = get();
let timer: livesplitCore.Timer;
let runnersFinished: boolean = false;

// Cross references for LiveSplit's TimerPhases.
const LS_TIMER_PHASE = {
  NotRunning: 0,
  Running: 1,
  Ended: 2,
  Paused: 3,
};

const COUNTDOWN_START_MS = 30 * 1000; // 30s in ms

/**
 * Resets timer replicant to default settings.
 */
function resetTimerRepToDefault(): void {
  timerRep.value = {
    time: msToTimeStr(COUNTDOWN_START_MS),
    milliseconds: COUNTDOWN_START_MS,
    timestamp: Date.now(),
    phase: 'stopped',
  };
  nodecg.log.debug('[Timer] Replicant restored to default');
}

/**
 * Use jokers
 */
function joker(): void {
  timerRep.value = {
    time: msToTimeStr(15000),
    milliseconds: 15000,
    timestamp: Date.now(),
    phase: 'running',
  };
}

/**
 * Use enumeration timer
 */
function enumeration(): void {
  timerRep.value = {
    time: msToTimeStr(45000),
    milliseconds: 45000,
    timestamp: Date.now(),
    phase: 'running',
  };
}

/**
 * Set timer replicant string time and milliseconds based off a millisecond value.
 * @param ms Milliseconds you want to set the timer replicant at.
 */
function setTime(ms: number): void {
  timerRep.value.time = msToTimeStr(ms);
  timerRep.value.milliseconds = ms;
  // nodecg.log.debug(`[Timer] Set to ${msToTimeStr(ms)}/${ms}`);
}

/**
 * Set game time.
 * Game Time is used so we can edit the timer easily.
 * @param ms Milliseconds you want to set the game time at.
 */
function setGameTime(ms: number): void {
  if (timerRep.value.phase === 'stopped') {
    livesplitCore.TimeSpan.fromSeconds(0).with((t) => timer.setLoadingTimes(t));
    timer.initializeGameTime();
  }
  livesplitCore.TimeSpan.fromSeconds(ms / 1000).with((t) => timer.setGameTime(t));
  nodecg.log.debug(`[Timer] Game time set to ${ms}`);
}

/**
 * Start/resume the timer, depending on the current state.
 * @param force Force the timer to start, even if it's state is running/changes are disabled.
 */
async function startTimer(force?: boolean): Promise<void> {
  try {
    if (!force) {
      throw new Error('Timer changes are disabled');
    }
    if (timerRep.value.phase === 'finished') {
      throw new Error('Timer is in the finished state');
    }
    if (!force && !['stopped', 'paused'].includes(timerRep.value.phase)) {
      throw new Error('Timer is not stopped/paused');
    }

    if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
      timer.start();
      nodecg.log.debug('[Timer] Countdown started');
    } else {
      timer.resume();
      nodecg.log.debug('[Timer] Countdown resumed');
    }
    timerRep.value.phase = 'running';
    timerRep.value.timestamp = Date.now();
  } catch (err) {
    nodecg.log.debug('[Timer] Cannot start/resume timer:', err);
    throw err;
  }
}


/**
 * Pause the timer.
 */
async function pauseTimer(): Promise<void> {
  try {
    // Error if the timer isn't running.
    if (timerRep.value.phase !== 'running') {
      throw new Error('Timer is not running');
    }

    timer.pause();
    timerRep.value.phase = 'paused';
    nodecg.log.debug('[Timer] Paused');
  } catch (err) {
    nodecg.log.debug('[Timer] Cannot pause timer:', err);
    throw err;
  }
}

/**
 * Reset the timer.
 * @param force Forces a reset even if changes are disabled.
 */
export async function resetTimer(force?: boolean): Promise<void> {
  try {
    if (!force) {
      throw new Error('Timer changes are disabled');
    }
    if (timerRep.value.phase === 'stopped') {
      throw new Error('Timer is stopped');
    }

    timer.reset(false);
    resetTimerRepToDefault();
    finishTimes.value.player1 = '';
    finishTimes.value.player2 = '';
    runnersFinished = false;
    nodecg.log.debug('[Timer] Reset with countdown start');
  } catch (err) {
    nodecg.log.debug('[Timer] Cannot reset timer:', err);
    throw err;
  }
}


/**
 * Stop/finish the timer.
 * @param id Team's ID you wish to have finish (if there is an active run).
 * @param forfeit Specify this if the team has forfeit.
 */
async function stopTimer(): Promise<void> {
  try {
    // Error if timer is not running.
    if (!['running', 'paused'].includes(timerRep.value.phase)) {
      throw new Error('Timer is not running/paused');
    }

    // Stop the timer if all the teams have finished (or no teams exist).
    if (timerRep.value.state === 'paused') {
      timer.resume();
    }
    timer.split();
    timerRep.value.phase = 'finished';
    nodecg.log.debug('[Timer] Finished');
  } catch (err) {
    nodecg.log.debug('[Timer] Cannot stop timer:', err);
    throw err;
  }
}

/**
 * This stuff runs every 1/10th a second to keep the time updated.
 */
let lastTickTime = Date.now(); // Track the last time the tick function was executed

function tick(): void {
  if (timerRep.value.phase === 'running') {
    const now = Date.now();
    const elapsedSinceLastTick = now - lastTickTime;

    // Only update the timer if a full second has passed
    if (elapsedSinceLastTick >= 1000) {
      // Calculate the new remaining time by subtracting exactly 1000ms
      const remainingTime = timerRep.value.milliseconds - 1000;

      // If time has run out, stop the timer
      if (remainingTime <= 0) {
        setTime(0);
        stopTimer().catch((err) => nodecg.log.error('Failed to stop timer:', err));
        return;
      }

      // Update the timer with the new remaining time
      setTime(remainingTime);

      // Update the last tick time and the timestamp in timerRep
      lastTickTime = now;
      timerRep.value.timestamp = now;
      timerRep.value.milliseconds = remainingTime;
    }
  }
}

// Sets up the timer with a single split.
const liveSplitRun = livesplitCore.Run.new();
liveSplitRun.pushSegment(livesplitCore.Segment.new('finish'));
timer = livesplitCore.Timer.new(liveSplitRun) as livesplitCore.Timer;

// If the timer was running when last closed, tries to resume it at the correct time.
if (timerRep.value.state === 'running') {
  const missedTime = Date.now() - timerRep.value.timestamp;
  const previousTime = timerRep.value.milliseconds;
  const timeOffset = previousTime + missedTime;
  setTime(timeOffset);
  nodecg.log.info(`[Timer] Recovered ${(missedTime / 1000).toFixed(2)} seconds of lost time`);
  startTimer(true).catch(() => {
    /* catch error if needed, for safety */
  });
}

// NodeCG messaging system.
nodecg.listenFor('timerStart', (data, ack) => {
  startTimer(true)
    .then(() => processAck(ack, null))
    .catch((err) => processAck(ack, err));
});
nodecg.listenFor('timerPause', (data, ack) => {
  pauseTimer()
    .then(() => processAck(ack, null))
    .catch((err) => processAck(ack, err));
});
nodecg.listenFor('timerReset', (force, ack) => {
  resetTimer(force)
    .then(() => processAck(ack, null))
    .catch((err) => processAck(ack, err));
});
nodecg.listenFor('timerFinish', (data, ack) => {
  stopTimer()
    .then(() => processAck(ack, null))
    .catch((err) => processAck(ack, err));
});
nodecg.listenFor('joker', () => {
  joker()
});
nodecg.listenFor('enum', () => {
  enumeration()
});
nodecg.listenFor('finishPlayer1', () => {
  finishTimes.value.player1 = timerRep.value.time;
});

nodecg.listenFor('finishPlayer2', () => {
  finishTimes.value.player2 = timerRep.value.time;
});

// Stop timer when both runners finished
timerRep.on('change', () => {
  if (
    finishTimes.value.player1.length > 0 &&
    finishTimes.value.player2.length > 0 &&
    !runnersFinished
  ) {
    runnersFinished = true;
    nodecg.sendMessage('timerFinish');
  }
});

setInterval(tick, 100);
