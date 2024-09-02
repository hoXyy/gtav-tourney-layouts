<template>
  <div v-if="editedQuestionData" style="display: flex; flex-direction: column; gap: 15px; width: 100%">
    <div style="display: flex; flex-direction: row; gap: 5px; justify-content: space-between">
      <QInput
          outlined
          v-model="editedQuestionData.id"
          label="Question #"
          style="width: 50%" />
      <QSelect
        outlined
        v-model="editedQuestionData.type"
        :options="questionTypes"
        label="Question Types"
        emit-value
        style="width: 30%"
        :display-value="questionTypes.find((type) => type.value === editedQuestionData.type)?.label" />
    </div>
    <QSeparator />
    <QInput
          outlined
          v-model="editedQuestionData.question"
          label="Question Text"
          style="width: 100%" />
    <QSeparator />
    <div style="display: flex; flex-direction: column; gap: 15px">
      <p style="font-size: 26px"><b>Players</b></p>
      <div style="display: flex; gap: 5px">
        <QInput
          outlined
          v-model="editedQuestionData.answers.answer1"
          label="Answer 1"
          style="width: 100%" />
      </div>
      <div style="display: flex; gap: 5px">
        <QInput
          outlined
          v-model="editedQuestionData.answers.answer2"
          label="Answer 2"
          style="width: 100%" />
      </div>
      <div style="display: flex; gap: 5px">
        <QInput
          outlined
          v-model="editedQuestionData.answers.answer3"
          label="Answer 3"
          style="width: 100%" />
      </div>
      <div style="display: flex; gap: 5px">
        <QInput
          outlined
          v-model="editedQuestionData.answers.answer4"
          label="Answer 4"
          style="width: 100%" />
      </div>
    </div>
    <QSeparator />
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { currentQuestion, questions } from '@layouts/types';
  import { $ref } from 'vue/macros';
  import { watch } from 'vue';

  const editedQuestionId = useReplicant<string>('editedQuestionId', 'gtav-tourney-layouts', {
    defaultValue: '',
  });

  const questions = useReplicant<questions>('questions', 'gtav-tourney-layouts', {
    defaultValue: [],
  });

  let questionTypes = $ref([
    { label: 'normal', value: 'normal' },
    { label: 'enumeration', value: 'enumeration' },
    { label: 'estimate', value: 'estimate' },
  ]);

  const emptyQuestionData: currentQuestion = {
    id: '',
    question: '',
    type: 'normal',
    answers: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    },
  };

  // added here for safety to avoid opening a panel to an empty run by accident
  watch(
    () => editedQuestionId?.data,
    (val) => {
      if (val && questions && questions.data && questions.data.length > 0) {
        const question = questions.data.find((questions) => questions.id === val);
        if (question) {
          editedQuestionData = question;
        } else {
          editedQuestionData = emptyQuestionData;
        }
      } else {
        editedQuestionData = emptyQuestionData;
      }
    }
  );

  document.addEventListener('dialog-opened', () => {
    if (editedQuestionId && questions && questions.data && questions.data.length > 0) {
      const question = questions.data.find((question) => question.id === editedQuestionId.data);
      if (question) {
        editedQuestionData = question;
      } else {
        editedQuestionData = emptyQuestionData;
      }
    } else {
      editedQuestionData = emptyQuestionData;
    }
  });

  document.addEventListener('dialog-confirmed', () => {
    nodecg.sendMessage('updatedQuestionData', editedQuestionData);
    editedQuestionId!.data = '';
    editedQuestionId!.save();
  });

  document.addEventListener('dialog-dismissed', () => {
    if (editedQuestionId) {
      editedQuestionId.data = '';
      editedQuestionId!.save();
      editedQuestionData = emptyQuestionData;
    }
  });

  let editedQuestionData = $ref<currentQuestion>(emptyQuestionData);
</script>
