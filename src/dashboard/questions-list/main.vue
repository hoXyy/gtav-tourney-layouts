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
      <QBtn color="black" @click="correctAnswerA(true)">Correct Answer A</QBtn>
      <QBtn color="black" @click="showAnswerB(true)">Show Answer B</QBtn>
      <QBtn color="black" @click="correctAnswerB(true)">Correct Answer B</QBtn>
      <QBtn color="black" @click="showAnswerC(true)">Show Answer C</QBtn>
      <QBtn color="black" @click="correctAnswerC(true)">Correct Answer C</QBtn>
      <QBtn color="black" @click="showAnswerD(true)">Show Answer D</QBtn>
      <QBtn color="black" @click="correctAnswerD(true)">Correct Answer D</QBtn>
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
  const showsAnswers = useReplicant<boolean>('showsAnswers', 'gtav-tourney-layouts');

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
</style>