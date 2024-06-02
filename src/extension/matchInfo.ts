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
