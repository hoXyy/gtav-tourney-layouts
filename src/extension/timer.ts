import clone from 'clone';
import livesplitCore from 'livesplit-core';
import { msToTimeStr, processAck, timeStrToMS } from './util/helpers';
import { get } from './util/nodecg';
import { timer as timerRep, finishTimes, currentMatch } from './util/replicants';
import { Timer } from '@layouts/types/schemas';

const nodecg = get();
let timer: livesplitCore.Timer | null = null;
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
 * Set timer replicant string time and milliseconds based off a millisecond value.
 * @param ms Milliseconds you want to set the timer replicant at.
 */
function setTime(ms: number): void {
  if (timer) {
    timerRep.value.time = msToTimeStr(ms);
    timerRep.value.milliseconds = ms;
  } else {
    nodecg.log.error('[Timer] Cannot set time - timer is null.');
  }
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
    if (!['stopped', 'paused'].includes(timerRep.value.phase)) {
      throw new Error('Timer is not stopped/paused');
    }

    if (timer) {
      if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
        timer.start();
      } else {
        timer.resume();
      }
      timerRep.value.phase = 'running';
      timerRep.value.timestamp = Date.now();
    } else {
      throw new Error('Timer is not initialized');
    }
  } catch (err) {
    nodecg.log.error('[Timer] Cannot start/resume timer:', err);
    throw err;
  }
}

/**
 * Pause the timer.
 */
async function pauseTimer(): Promise<void> {
  try {
    if (timerRep.value.phase !== 'running') {
      throw new Error('Timer is not running');
    }
    if (timer) {
      timer.pause();
      timerRep.value.phase = 'paused';
    } else {
      throw new Error('Timer is not initialized');
    }
  } catch (err) {
    nodecg.log.error('[Timer] Cannot pause timer:', err);
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
    if (timer) {
      timer.reset(false);
      resetTimerRepToDefault();
      finishTimes.value.player1 = '';
      finishTimes.value.player2 = '';
      runnersFinished = false;
    } else {
      throw new Error('Timer is not initialized');
    }
  } catch (err) {
    nodecg.log.error('[Timer] Cannot reset timer:', err);
    throw err;
  }
}

/**
 * Stop/finish the timer.
 */
async function stopTimer(): Promise<void> {
  try {
    // Error if timer is not running.
    if (!['running', 'paused'].includes(timerRep.value.phase)) {
      throw new Error('Timer is not running/paused');
    }

    // Stop the timer if all the teams have finished (or no teams exist).
    if (timer) {
      if (timerRep.value.phase === 'paused') {
        timer.resume();
      }
      timer.split();
      timerRep.value.phase = 'finished';
      nodecg.log.debug('[Timer] Finished');
    } else {
      throw new Error('Timer is not initialized');
    }
  } catch (err) {
    nodecg.log.error('[Timer] Cannot stop timer:', err);
    throw err;
  }
}

/**
 * This stuff runs every 1/10th a second to keep the time updated.
 */
let lastTickTime = Date.now(); // Track the last time the tick function was executed

function countdownTick(): void {
  if (timerRep.value.phase === 'running') {
    const now = Date.now();
    const elapsedSinceLastTick = now - lastTickTime;

    if (elapsedSinceLastTick >= 1000) {
      const remainingTime = timerRep.value.milliseconds - 1000;

      if (remainingTime <= 0) {
        setTime(0);
        stopTimer().catch((err) => nodecg.log.error('Failed to stop timer:', err));
        return;
      }

      setTime(remainingTime);

      lastTickTime = now;
      timerRep.value.timestamp = now;
      timerRep.value.milliseconds = remainingTime;
    }
  }
}

function tick(): void {
  if (timerRep.value.phase === 'running' && timer) {
    const time = timer.currentTime()?.gameTime();
    if (time) {
      const ms = Math.floor(time.totalSeconds() * 1000);
      setTime(ms);
      timerRep.value.timestamp = Date.now();
    } else {
      nodecg.log.error('[Timer] Timer currentTime or gameTime is null, cannot proceed with tick.');
    }
  } else if (!timer) {
    nodecg.log.error('[Timer] Timer is null during tick.');
  }
}

// Initialize the timer based on match type
function initializeTimer(): void {
  try {
    const run = livesplitCore.Run.new();
    const segmentName = currentMatch.value?.type === 'quiz' ? 'quiz_finish' : 'finish';
    run.pushSegment(livesplitCore.Segment.new(segmentName));
    timer = livesplitCore.Timer.new(run);
    nodecg.log.debug('[Timer] Timer initialized successfully.');
  } catch (error) {
    nodecg.log.error('[Timer] Failed to initialize the timer:', error);
    timer = null;
  }
}

initializeTimer();

// If the timer was running when last closed, tries to resume it at the correct time.
if (timerRep.value.phase === 'running' && timer) {
  const missedTime = Date.now() - timerRep.value.timestamp;
  const previousTime = timerRep.value.milliseconds;
  const timeOffset = previousTime - missedTime;
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
  setTime(15000);
  startTimer(true).catch(() => {
    /* catch error if needed, for safety */
  });
});
nodecg.listenFor('enum', () => {
  setTime(45000);
  startTimer(true).catch(() => {
    /* catch error if needed, for safety */
  });
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

// Use the appropriate tick function based on the match type
setInterval(currentMatch.value?.type === 'quiz' ? countdownTick : tick, 100);
