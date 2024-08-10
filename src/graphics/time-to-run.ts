import { CurrentMatch } from '@layouts/types';
import humanizeDuration from 'humanize-duration';

function customizedRounding(time: number): number {
  let rounded: number;
  if (time < 1800) {
    rounded = 3600;
  } else {
    rounded = time;
  }
  return rounded;
}

export function timeToMatch(match: CurrentMatch): string {
  let value = '';

  if (match.startTime) {
    const now = Math.floor(Date.now() / 1000);
    const startTimeS = Math.floor(match.startTime / 1000);
    const timerS = startTimeS - now;
    const roundedS = customizedRounding(timerS);
    value = humanizeDuration(roundedS * 1000, {
      language: 'en',
      conjunction: ' and ',
      serialComma: false,
      round: true,
      units: ['d', 'h'],
    });
  }
  return value;
}
