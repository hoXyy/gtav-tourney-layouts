import { CurrentMatch } from '@layouts/types';
import humanizeDuration from 'humanize-duration';

function customizedRounding(time: number): number {
  let rounded: number;
  if (time < 300) {
    rounded = Math.round(time / 60) * 60;
  } else if (time < 3600) {
    rounded = Math.round(time / 300) * 300;
  } else if (time < 7200) {
    const round10 = Math.round(time / 600) * 600;
    const round15 = Math.round(time / 900) * 900;
    rounded = Math.abs(round10 - time) < Math.abs(round15 - time) ? round10 : round15;
  } else if (time < 14400) {
    rounded = Math.round(time / 900) * 900;
  } else if (time < 21600) {
    rounded = Math.round(time / 1800) * 1800;
  } else {
    rounded = Math.round(time / 3600) * 3600;
  }
  return rounded;
}

export function timeToMatch(match: CurrentMatch): string {
  let value = '';

  if (match.startTime) {
    const now = Math.floor(Date.now() / 1000);
    const startTimeS = Math.floor(match.startTime / 1000);
    const timerS = startTimeS - now;
    if (timerS > 30) {
      const roundedS = customizedRounding(timerS);
      value = humanizeDuration(roundedS * 1000, {
        language: 'en',
        conjunction: ' and ',
        serialComma: false,
        units: ['d', 'h', 'm'],
      });
    }
  }
  return value;
}
