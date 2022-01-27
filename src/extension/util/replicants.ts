/* eslint-disable max-len */

import { Matchinfo, Timer } from '@layouts/types/schemas';
import { Commentators } from '@layouts/types/schemas/commentators';
import { get as nodecg } from './nodecg';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const timerRep = nodecg().Replicant<Timer>('timer');
export const matchinfoRep = nodecg().Replicant<Matchinfo>('matchinfo');
export const commentatorsRep = nodecg().Replicant<Commentators>('commentators');