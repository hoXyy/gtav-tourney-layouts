<template>
  <div v-if="questions && questions.data" style="display: flex; flex-direction: column; gap: 15px">
    <QBtn color="black" nodecg-dialog="add-edit-questions">Add new question</QBtn>
    <QSeparator />
    <QList v-if="questions.data.length > 0" bordered class="rounded-corners"
      ><QExpansionItem
        expand-separator
        :key="question.id"
        v-for="question in questions.data"
        :label="`${question.question}`"
        :caption="`${question.type}`"
        ><QCard
          ><QCardActions
            ><div>
              <QBtn flat @click="setQuestionAsActive(question.id)">Set as active question</QBtn>
            </div>
            <div>
              <QBtn flat stretch @click="setQuestionId(question.id)" nodecg-dialog="add-edit-questions"
                >Edit question</QBtn
              ><QBtn flat stretch @click="removeQuestion(question.id)">Remove question</QBtn>
            </div></QCardActions
          ></QCard
        ></QExpansionItem
      ></QList
    >
    <p v-else style="text-align: center; font-size: 20px">No questions to list.</p>
    <QSeparator/>
    <div class="button-container">
      <QBtn color="black" @click="showAnswerA(true)">Show Answer A</QBtn>
      <QBtn color="green" @click="correctAnswerA(true)">Correct Answer A</QBtn>
      <QBtn color="black" @click="showAnswerB(true)">Show Answer B</QBtn>
      <QBtn color="green" @click="correctAnswerB(true)">Correct Answer B</QBtn>
      <QBtn color="black" @click="showAnswerC(true)">Show Answer C</QBtn>
      <QBtn color="green" @click="correctAnswerC(true)">Correct Answer C</QBtn>
      <QBtn color="black" @click="showAnswerD(true)">Show Answer D</QBtn>
      <QBtn color="green" @click="correctAnswerD(true)">Correct Answer D</QBtn>
    </div>
    <QSeparator/>
    <div class="answer-container">
      <div>
        <QBtn color="pink" @click="pinkPicks('A')">Pink Picks A</QBtn>
        <QBtn color="pink" @click="pinkPicks('B')">Pink Picks B</QBtn>
        <QBtn color="pink" @click="pinkPicks('C')">Pink Picks C</QBtn>
        <QBtn color="pink" @click="pinkPicks('D')">Pink Picks D</QBtn>
      </div>
      <div>
        <QBtn color="black" @click="yellowPicks('A')">Yellow Picks A</QBtn>
        <QBtn color="black" @click="yellowPicks('B')">Yellow Picks B</QBtn>
        <QBtn color="black" @click="yellowPicks('C')">Yellow Picks C</QBtn>
        <QBtn color="black" @click="yellowPicks('D')">Yellow Picks D</QBtn>
      </div>
      <div>
        <QBtn color="purple" @click="purplePicks('A')">Purple Picks A</QBtn>
        <QBtn color="purple" @click="purplePicks('B')">Purple Picks B</QBtn>
        <QBtn color="purple" @click="purplePicks('C')">Purple Picks C</QBtn>
        <QBtn color="purple" @click="purplePicks('D')">Purple Picks D</QBtn>
      </div>
      <div>
        <QBtn color="teal" @click="tealPicks('A')">Teal Picks A</QBtn>
        <QBtn color="teal" @click="tealPicks('B')">Teal Picks B</QBtn>
        <QBtn color="teal" @click="tealPicks('C')">Teal Picks C</QBtn>
        <QBtn color="teal" @click="tealPicks('D')">Teal Picks D</QBtn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { currentQuestion, questions } from '@layouts/types';

  const questions = useReplicant<questions>('questions', 'gtav-tourney-layouts');
  const currentQuestion = useReplicant<currentQuestion>('currentQatch', 'gtav-tourney-layouts');
  const editedQuestionId = useReplicant<string>('editedQuestionId', 'gtav-tourney-layouts', {
    defaultValue: '',
  });

  function setQuestionId(questionId: string) {
    editedQuestionId!.data = questionId;
    editedQuestionId!.save();
  }

  function removeQuestion(questionId: string) {
    nodecg.sendMessage('removeQuestion', questionId);
  }

  function setQuestionAsActive(questionId: string) {
    nodecg.sendMessage('setQuestionAsActive', questionId);
  }

  function showAnswerA(show: boolean){
    nodecg.sendMessage('showAnswerA', show);
  }

  function showAnswerB(show: boolean){
    nodecg.sendMessage('showAnswerB', show);
  }

  function showAnswerC(show: boolean){
    nodecg.sendMessage('showAnswerC', show);
  }

  function showAnswerD(show: boolean){
    nodecg.sendMessage('showAnswerD', show);
  }

  function correctAnswerA(correct: boolean){
    nodecg.sendMessage('correctAnswerA', correct);
  }

  function correctAnswerB(correct: boolean){
    nodecg.sendMessage('correctAnswerB', correct);
  }

  function correctAnswerC(correct: boolean){
    nodecg.sendMessage('correctAnswerC', correct);
  }

  function correctAnswerD(correct: boolean){
    nodecg.sendMessage('correctAnswerD', correct);
  }

  function pinkPicks(answer: string){
    nodecg.sendMessage('pinkPicks', answer);
  }

  function yellowPicks(answer: string){
    nodecg.sendMessage('yellowPicks', answer);
  }

  function purplePicks(answer: string){
    nodecg.sendMessage('purplePicks', answer);
  }

  function tealPicks(answer: string){
    nodecg.sendMessage('tealPicks', answer);
  }

</script>

<style>
  .button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .button-container QBtn {
    flex: 1 1 45%; 
    max-width: 45%; 
    box-sizing: border-box;
  }

  .answer-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .answer-container QBtn {
    flex: 1 1 22%; 
    max-width: 22%; 
    box-sizing: border-box;
  }
</style>