/* eslint-disable max-len */

import { Commentators, Omnibarfield, Timer } from '@layouts/types/schemas';
import {
  Avatars,
  CurrentMatch,
  currentQuestion,
  CurrentSegment,
  FinishTimes,
  ManualPb,
  Matches,
  PlayerPbs,
  questions,
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
export const Questions = nodecg().Replicant<questions>('questions', {
  defaultValue: [],
});
export const currentMatch = nodecg().Replicant<CurrentMatch | undefined>('currentMatch');
export const CurrentQuestion = nodecg().Replicant<currentQuestion | undefined>('currentQuestion');
export const currentSegment = nodecg().Replicant<CurrentSegment | undefined>('currentSegment');
export const commentators = nodecg().Replicant<Commentators>('commentators');
export const omnibarfield = nodecg().Replicant<Omnibarfield>('omnibarfield');
export const playerPBs = nodecg().Replicant<PlayerPbs>('playerPbs');
export const timer = nodecg().Replicant<Timer>('timer');
export const finishTimes = nodecg().Replicant<FinishTimes>('finishTimes', {
  defaultValue: { player1: '', player2: '' },
});
export const score = nodecg().Replicant<Score>('score', {
  defaultValue: { player1: 0, player2: 0, player3: 0, player4: 0 },
});
export const enumScore = nodecg().Replicant<Score>('enumScore', {
  defaultValue: { player1: 0, player2: 0, player3: 0, player4: 0 },
});
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
export const currentObsScene = nodecg().Replicant<string>('currentObsScene');
export const playerAvatars = nodecg().Replicant<Avatars>('playerAvatars', {
  defaultValue: { player1: '', player2: '', player3: '', player4: '' },
});
export const showsAnswerA = nodecg().Replicant<boolean>('showsAnswerA');
export const showsAnswerB = nodecg().Replicant<boolean>('showsAnswerB');
export const showsAnswerC = nodecg().Replicant<boolean>('showsAnswerC');
export const showsAnswerD = nodecg().Replicant<boolean>('showsAnswerD');
export const correctsAnswerA = nodecg().Replicant<boolean>('correctsAnswerA');
export const correctsAnswerB = nodecg().Replicant<boolean>('correctsAnswerB');
export const correctsAnswerC = nodecg().Replicant<boolean>('correctsAnswerC');
export const correctsAnswerD = nodecg().Replicant<boolean>('correctsAnswerD');
export const setsPinkPick = nodecg().Replicant<boolean>('setsPinkPick');
export const setsYellowPick = nodecg().Replicant<boolean>('setsYellowPick');
export const setsPurplePick = nodecg().Replicant<boolean>('setsPurplePick');
export const setsTealPick = nodecg().Replicant<boolean>('setsTealPick');

