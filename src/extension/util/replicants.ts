/* eslint-disable max-len */

import { Matchinfo, Timer, Player1, Player2, Manual } from '@layouts/types/schemas';
import { Commentators } from '@layouts/types/schemas/commentators';
import { get as nodecg } from './nodecg';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const timerRep = nodecg().Replicant<Timer>('timer');
export const matchinfoRep = nodecg().Replicant<Matchinfo>('matchinfo');
export const commentatorsRep = nodecg().Replicant<Commentators>('commentators');
export const player1Rep = nodecg().Replicant<Player1>('player1');
export const player2Rep = nodecg().Replicant<Player2>('player2');
export const manualpb = nodecg().Replicant<Manual>('manual');