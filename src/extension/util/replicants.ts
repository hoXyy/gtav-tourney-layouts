/* eslint-disable max-len */

import { Commentators, Timer } from '@layouts/types/schemas';
import {
  CurrentMatch,
  CurrentSegment,
  FinishTimes,
  ManualPb,
  Matches,
  PlayerPbs,
  Score,
} from '@layouts/types';
import { get as nodecg } from './nodecg';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const connectedToOBS = nodecg().Replicant<boolean>('connectedToOBS', {
  defaultValue: false,
});
export const matches = nodecg().Replicant<Matches>('matches', {
  defaultValue: [],
});
export const currentMatch = nodecg().Replicant<CurrentMatch | undefined>('currentMatch');
export const currentSegment = nodecg().Replicant<CurrentSegment | undefined>('currentSegment');
export const commentators = nodecg().Replicant<Commentators>('commentators');
export const playerPBs = nodecg().Replicant<PlayerPbs>('playerPbs');
export const timer = nodecg().Replicant<Timer>('timer');
export const finishTimes = nodecg().Replicant<FinishTimes>('finishTimes');
export const score = nodecg().Replicant<Score>('score');
export const prizePool = nodecg().Replicant<number>('prizePool');
export const segmentPicks = nodecg().Replicant<CurrentSegment[]>('segmentPicks', {
  defaultValue: [],
});
export const segmentBans = nodecg().Replicant<CurrentSegment[]>('segmentBans', {
  defaultValue: [],
});

export const manualPb = nodecg().Replicant<ManualPb>('manualPb', {
  defaultValue: { player1: false, player2: false },
});
