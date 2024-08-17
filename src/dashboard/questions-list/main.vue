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
    <QBtn color="black" @click="showAnswers(true)">Show Answers</QBtn>
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

  function showAnswers(show: boolean){
    nodecg.sendMessage('showAnswers', show);
  }
</script>