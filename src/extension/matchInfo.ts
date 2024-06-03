import { CurrentMatch } from '@layouts/types';
import { get } from './util/nodecg';
import { currentMatch, currentSegment, matches, playerPBs } from './util/replicants';
import { klona as clone } from 'klona/json';

const nodecg = get();

matches.on('change', (newVal) => {
  if (currentMatch.value != undefined) {
    const currentMatchIndex = newVal.findIndex((match) => match.id === currentMatch.value!.id);
    if (currentMatchIndex > -1) {
      currentMatch.value = clone(newVal[currentMatchIndex]);
    } else {
      // If the current match got removed from the list, unset the current match variable
      currentMatch.value = undefined;
    }
  }
});

// zero out current segment on match change
currentMatch.on('change', (newVal, oldVal) => {
  if (newVal) {
    if (oldVal) {
      if (newVal.id != oldVal.id) {
        currentSegment.value = undefined;
      }
    } else {
      currentSegment.value = undefined;
    }
  }
});

function removeMatch(matchId: string) {
  if (matches.value) {
    const index = matches.value.findIndex((match) => match.id === matchId);
    if (index > -1) {
      matches.value.splice(index, 1);
    }
  }
}

function setMatchAsActive(matchId: string) {
  if (matches.value) {
    const match = matches.value.find((match) => match.id === matchId);
    if (match) {
      currentMatch.value = clone(match);
    }
  }
}

function updateMatchData(matchData: CurrentMatch) {
  if (matches.value) {
    if (matches.value.length > 0) {
      const index = matches.value.findIndex((match) => match.id === matchData.id);
      if (index > -1) {
        matches.value[index] = matchData;
      } else {
        matches.value.push(matchData);
      }
    } else {
      matches.value.push(matchData);
    }
  }
}

nodecg.listenFor('removeMatch', (matchId) => removeMatch(matchId));
nodecg.listenFor('setMatchAsActive', (matchId) => setMatchAsActive(matchId));
nodecg.listenFor('updateMatchData', (matchData) => updateMatchData(matchData));
