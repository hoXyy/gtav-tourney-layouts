<template>
  <div
    style="display: flex; text-align: center; width: 100%; flex-direction: column"
    v-if="
      currentMatch && currentMatch.data && currentMatch.data.type == 'quiz' && enumScore && enumScore.data
    "
  >
    <h2>
      <span style="font-size: 16px">{{ player1Name }}</span>
      <b style="font-size: 48px">{{ enumScore.data.player1 }} - {{ enumScore.data.player2 }}</b>
      <span style="font-size: 16px">{{ player2Name }}</span>
    </h2>
    <h2>
      <span style="font-size: 16px">{{ player3Name }}</span>
      <b style="font-size: 48px">{{ enumScore.data.player3 }} - {{ enumScore.data.player4 }}</b>
      <span style="font-size: 16px">{{ player4Name }}</span>
    </h2>
    <div style="display: flex; gap: 5px">
      <QBtn style="width: 100%" color="black" @click="increasePlayer1Score()">+</QBtn>
      <QBtn
        style="width: 100%"
        color="black"
        :disable="enumScore.data.player1 === 0"
        @click="decreasePlayer1Score()"
      >-</QBtn>
      <QBtn style="width: 100%" color="black" @click="increasePlayer2Score()">+</QBtn>
      <QBtn
        style="width: 100%"
        color="black"
        :disable="enumScore.data.player2 === 0"
        @click="decreasePlayer2Score()"
      >-</QBtn>
      <QBtn style="width: 100%" color="black" @click="increasePlayer3Score()">+</QBtn>
      <QBtn
        style="width: 100%"
        color="black"
        :disable="enumScore.data.player3 === 0"
        @click="decreasePlayer3Score()"
      >-</QBtn>
      <QBtn style="width: 100%" color="black" @click="increasePlayer4Score()">+</QBtn>
      <QBtn
        style="width: 100%"
        color="black"
        :disable="enumScore.data.player4 === 0"
        @click="decreasePlayer4Score()"
      >-</QBtn>
    </div>
    <br />
    <QBtn color="black" @click="resetScore()">Reset Score</QBtn>
  </div>
</template>

<script setup lang="ts">
  import { Timer } from '@layouts/types/schemas';
  import { CurrentMatch, Score, FinishTimes } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import { $ref } from 'vue/macros';
  import { watch } from 'vue';

  const enumScore = useReplicant<Score>('enumScore', 'gtav-tourney-layouts');
  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const finishTimes = useReplicant<FinishTimes>('finishTimes', 'gtav-tourney-layouts');
  const timer = useReplicant<Timer>('quizTimer', 'gtav-tourney-layouts');

  let phase = $ref('');
  let player1Name = $ref('');
  let player2Name = $ref('');
  let player3Name = $ref('');
  let player4Name = $ref('');

  watch(
    () => timer?.data,
    (val) => {
      if (val) phase = val.phase;
    },
    { immediate: true }
  );

  watch(
    () => currentMatch?.data,
    (val) => {
      if (val) {
        player1Name = val.players.player1.name;
        player2Name = val.players.player2.name;
        player3Name = val.players.player3!.name;
        player4Name = val.players.player4!.name;
      }
    },
    { immediate: true }
  );

  function increasePlayer1Score() {
    if (enumScore && enumScore.data) {
      enumScore.data.player1++;
      enumScore.save();
    }
  }

  function increasePlayer2Score() {
    if (enumScore && enumScore.data) {
      enumScore.data.player2++;
      enumScore.save();
    }
  }

  function increasePlayer3Score() {
    if (enumScore && enumScore.data) {
      enumScore.data.player3!++;
      enumScore.save();
    }
  }

  function increasePlayer4Score() {
    if (enumScore && enumScore.data) {
      enumScore.data.player4!++;
      enumScore.save();
    }
  }

  function decreasePlayer1Score() {
    if (enumScore && enumScore.data) {
      if (enumScore.data.player1 > 0) {
        enumScore.data.player1--;
        enumScore.save();
      }
    }
  }

  function decreasePlayer2Score() {
    if (enumScore && enumScore.data) {
      if (enumScore.data.player2 > 0) {
        enumScore.data.player2--;
        enumScore.save();
      }
    }
  }

  function decreasePlayer3Score() {
    if (enumScore && enumScore.data) {
      if (enumScore.data.player3! > 0) {
        enumScore.data.player3!--;
        enumScore.save();
      }
    }
  }

  function decreasePlayer4Score() {
    if (enumScore && enumScore.data) {
      if (enumScore.data.player4! > 0) {
        enumScore.data.player4!--;
        enumScore.save();
      }
    }
  }

  function resetScore() {
    if (enumScore && enumScore.data) {
      enumScore.data.player1 = 0;
      enumScore.data.player2 = 0;
      enumScore.data.player3 = 0;
      enumScore.data.player4 = 0;
      enumScore.save();
    }
  }
</script>