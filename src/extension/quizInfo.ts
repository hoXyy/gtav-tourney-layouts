import { CurrentMatch, currentQuestion } from '@layouts/types';
import { get } from './util/nodecg';
import { currentMatch, CurrentQuestion, currentSegment, matches, playerPBs, Questions, quizScore } from './util/replicants';
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

// zero out current segment and scores on match change
currentMatch.on('change', (newVal, oldVal) => {
  if (newVal) {
    if (oldVal) {
      if (newVal.id != oldVal.id) {
        currentSegment.value = undefined;
        quizScore.value = { player1: 0, player2: 0, player3: 0, player4: 0 };
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

function removeQuestion(questionId: string) {
  if (Questions.value) {
    const index = Questions.value.findIndex((question) => question.id === questionId);
    if (index > -1) {
      Questions.value.splice(index, 1);
    }
  }
}

function setQuestionAsActive(questionId: string) {
  if (Questions.value) {
    const question = Questions.value.find((question) => question.id === questionId);
    if (question) {
      CurrentQuestion.value = clone(question);
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

function updateQuestionData(questionData: currentQuestion) {
  if (Questions.value) {
    if (Questions.value.length > 0) {
      const index = Questions.value.findIndex((question) => question.id === questionData.id);
      if (index > -1) {
        Questions.value[index] = questionData;
      } else {
        Questions.value.push(questionData);
      }
    } else {
      Questions.value.push(questionData);
    }
  }
}

function markPlayer1AsSegmentWinner() {
  if (currentSegment.value && matches.value && currentMatch.value) {
    if (matches.value.length > 0) {
      const index = matches.value.findIndex((match) => match.id === currentMatch.value!.id);
      if (index > -1) {
        matches.value[index].segments.forEach((segment) => {
          if (segment.name === currentSegment.value!.name) {
            if (segment.wonBy === null) {
              segment.wonBy = matches.value[index].players.player1.name;
              quizScore.value.player1++;
            }
          }
        });
      }
    }
  }
}

function markPlayer2AsSegmentWinner() {
  if (currentSegment.value && matches.value && currentMatch.value) {
    if (matches.value.length > 0) {
      const index = matches.value.findIndex((match) => match.id === currentMatch.value!.id);
      if (index > -1) {
        matches.value[index].segments.forEach((segment) => {
          if (segment.name === currentSegment.value!.name) {
            if (segment.wonBy === null) {
              segment.wonBy = matches.value[index].players.player2.name;
              quizScore.value.player2++;
            }
          }
        });
      }
    }
  }
}

nodecg.listenFor('removeMatch', (matchId) => removeMatch(matchId));
nodecg.listenFor('removeQuestion', (questionId) => removeQuestion(questionId));
nodecg.listenFor('setMatchAsActive', (matchId) => setMatchAsActive(matchId));
nodecg.listenFor('setQuestionAsActive', (questionId) => setQuestionAsActive(questionId));
nodecg.listenFor('updateMatchData', (matchData) => updateMatchData(matchData));
nodecg.listenFor('updatedQuestionData', (questionData) => updateQuestionData(questionData));
nodecg.listenFor('finishPlayer1', markPlayer1AsSegmentWinner);
nodecg.listenFor('finishPlayer2', markPlayer2AsSegmentWinner);
