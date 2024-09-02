import clone from 'clone';
import livesplitCore from 'livesplit-core';
import { msToTimeStr, processAck, timeStrToMS } from './util/helpers';
import { get } from './util/nodecg';
import { timer as timerRep, quizTimer as quizTimerRep, finishTimes, currentMatch } from './util/replicants';
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
  const isQuiz = currentMatch.value?.type === 'quiz';
  const initialTimeMs = isQuiz ? COUNTDOWN_START_MS : 0; // 30s for quiz, 0 for non-quiz

  if (isQuiz) {
      quizTimerRep.value = {
          time: msToTimeStr(initialTimeMs, isQuiz),
          milliseconds: initialTimeMs,
          timestamp: Date.now(),
          phase: 'stopped',
      };
  } else {
      timerRep.value = {
          time: msToTimeStr(initialTimeMs, isQuiz),
          milliseconds: initialTimeMs,
          timestamp: Date.now(),
          phase: 'stopped',
      };
  }

  nodecg.log.debug(
      `[Timer] Replicant restored to default. Match type: ${isQuiz ? 'quiz' : 'standard'}, Initial Time: ${msToTimeStr(initialTimeMs, isQuiz)}`
  );
}

/**
 * Set timer replicant string time and milliseconds based off a millisecond value.
 * @param ms Milliseconds you want to set the timer replicant at.
 */
function setTime(ms: number): void {
  if (timer) {
      const isQuiz = currentMatch.value?.type === 'quiz';
      if (isQuiz) {
          quizTimerRep.value.time = msToTimeStr(ms, isQuiz);
          quizTimerRep.value.milliseconds = ms;
      } else {
          timerRep.value.time = msToTimeStr(ms, isQuiz);
          timerRep.value.milliseconds = ms;
      }
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
      if (quizTimerRep.value.phase === 'finished' || timerRep.value.phase === 'finished') {
          throw new Error('Timer is in the finished state');
      }

      const isQuiz = currentMatch.value?.type === 'quiz';
      const targetTimer = isQuiz ? quizTimerRep : timerRep;

      if (!['stopped', 'paused'].includes(targetTimer.value.phase)) {
          throw new Error('Timer is not stopped/paused');
      }

      if (timer) {
          if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
              timer.start();
          } else {
              timer.resume();
          }
          targetTimer.value.phase = 'running';
          targetTimer.value.timestamp = Date.now();
          lastTickTime = null; // Reset lastTickTime when starting
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
      // Check if the timer is running before attempting to pause it
      if (quizTimerRep.value.phase !== 'running' && timerRep.value.phase !== 'running') {
          nodecg.log.warn('[Timer] Attempted to pause timer, but it is not running.');
          return;
      }

      if (timer) {
          timer.pause();
          if (currentMatch.value?.type === 'quiz') {
            quizTimerRep.value.phase = 'paused';
          } else {
              timerRep.value.phase = 'paused';
          }
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
      if (quizTimerRep.value.phase === 'stopped' && currentMatch.value?.type === 'quiz') {
          throw new Error('Quiz Timer is stopped');
      } else if (timerRep.value.phase === 'stopped' && currentMatch.value?.type !== 'quiz') {
          throw new Error('Timer is stopped');
      }

      if (timer) {
          timer.reset(false);
          resetTimerRepToDefault();
          finishTimes.value.player1 = '';
          finishTimes.value.player2 = '';
          runnersFinished = false;
          lastTickTime = null; // Reset lastTickTime when resetting
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
    if (!['running', 'paused'].includes(timerRep.value.phase)) {
      throw new Error('Timer is not running/paused');
    }

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
let lastTickTime: number | null = null; // Track the last time the tick function was executed

function countdownTick(): void {
  if (quizTimerRep.value.phase === 'running') {
      const now = Date.now();
      if (lastTickTime === null) lastTickTime = now; // Initialize lastTickTime on first run
      const elapsed = now - lastTickTime;
      const remainingTime = quizTimerRep.value.milliseconds - elapsed;

      if (remainingTime <= 0) {
          setTime(0); // Set time to 0 for quiz
          quizTimerRep.value.phase = 'finished';
          stopTimer().catch((err) => nodecg.log.error('Failed to stop timer:', err));
          lastTickTime = null;
          return;
      }

      setTime(remainingTime); // Update remaining time for quiz
      lastTickTime = now;
  }
}

function tick(): void {
  if (timerRep.value.phase === 'running' && timer) {
    try {
      const timeSpan = timer.currentTime().realTime(); // Use realTime instead of gameTime
      if (timeSpan) {
        const ms = Math.floor(timeSpan.totalSeconds() * 1000);
        setTime(ms);
      } else {
        nodecg.log.error('[Timer] Timer timeSpan is null.');
      }
    } catch (error) {
      nodecg.log.error('[Timer] Error in tick function:', error);
    }
  }
}

// Initialize the timer based on match type
function initializeTimer(): void {
  try {
    const isQuiz = currentMatch.value?.type === 'quiz';
    const run = livesplitCore.Run.new();
    const segmentName = isQuiz ? 'quiz_finish' : 'finish';
    run.pushSegment(livesplitCore.Segment.new(segmentName));
    timer = livesplitCore.Timer.new(run);
    nodecg.log.debug('[Timer] Timer initialized successfully with segment:', segmentName);
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

currentMatch.once('change', (newVal: { type: any; }, oldVal: { type: any; }) => {
  if (newVal?.type !== oldVal?.type) {
    nodecg.log.info(`[Timer] Match type changed from ${oldVal?.type} to ${newVal?.type}. Reinitializing timer.`);
    initializeTimer();
    resetTimerRepToDefault();
  }
});

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
setInterval(() => {
  const isQuiz = currentMatch.value?.type === 'quiz';
  if (isQuiz && quizTimerRep.value.phase === 'running') {
      countdownTick();
  } else if (timerRep.value.phase === 'running') {
      tick();
  }
}, 100);