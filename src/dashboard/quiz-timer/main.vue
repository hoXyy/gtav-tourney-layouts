<template>
  <div v-if="timer && timer.data" style="display: flex; flex-direction: column; gap: 5px">
    <div style="width: 100%; text-align: center">
      <h1 style="font-size: 48px">
        <b>{{ timer.data.time }}</b>
      </h1>
      <div style="display: flex; text-align: center; justify-content: space-between; width: 100%">
      <QBtn width="12%" color="black" @click="startTimer" :disable="phase === 'finished'">{{
        phase === 'running' ? 'Pause Timer' : 'Start Timer'
      }}</QBtn>
      <QBtn width="12%" color="black" @click="resetTimer" :disable="phase === 'stopped'"
        >Reset Timer</QBtn
      >
      <QBtn width="12%" color="black" @click="fifteenS"
        >15s</QBtn
      >

      <QBtn width="12%" color="black" @click="pauseTimer"
        >Pause</QBtn
      >

      <QBtn width="12%" color="black" @click="fortyfiveS"
        >45s</QBtn
      >
    </div>
    </div>
    <div
      style="display: flex; text-align: center; width: 100%; flex-direction: column"
      v-if="
        currentMatch && currentMatch.data && quizScore && quizScore.data
      ">
      <h2>
        <span style="font-size: 16px">{{ player1Name }} - {{ quizScore.data.player1 }}</span><br>
        <QBtn style="width: 100%" color="black" @click="increasePlayer110Score()">+10</QBtn>
        <QBtn style="width: 100%" color="black" @click="increasePlayer115Score()">+15</QBtn>
        <QBtn
          style="width: 100%"
          color="black"
          :disable="quizScore.data.player1 === 0"
          @click="decreasePlayer1Score()"
          >-5</QBtn
        >
        <span style="font-size: 16px">{{ player2Name }} - {{ quizScore.data.player2 }}</span><br>
        <QBtn style="width: 100%" color="black" @click="increasePlayer210Score()">+10</QBtn>
        <QBtn style="width: 100%" color="black" @click="increasePlayer215Score()">+15</QBtn>
        <QBtn
          style="width: 100%"
          color="black"
          :disable="quizScore.data.player2 === 0"
          @click="decreasePlayer2Score()"
          >-5</QBtn
        >
        <span style="font-size: 16px">{{ player3Name }} - {{ quizScore.data.player3 }}</span><br>
        <QBtn style="width: 100%" color="black" @click="increasePlayer310Score()">+10</QBtn>
        <QBtn style="width: 100%" color="black" @click="increasePlayer315Score()">+15</QBtn>
        <QBtn
          style="width: 100%"
          color="black"
          :disable="quizScore.data.player3 === 0"
          @click="decreasePlayer3Score()"
          >-5</QBtn
        >
        <span style="font-size: 16px">{{ player4Name }} - {{ quizScore.data.player4 }}</span><br>
        <QBtn style="width: 100%" color="black" @click="increasePlayer410Score()">+10</QBtn>
        <QBtn style="width: 100%" color="black" @click="increasePlayer415Score()">+15</QBtn>
        <QBtn
          style="width: 100%"
          color="black"
          :disable="quizScore.data.player4 === 0"
          @click="decreasePlayer4Score()"
          >-5</QBtn
        >
      </h2>
      <br>
      <QBtn color="black" @click="resetScore()">Reset Score</QBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Timer } from '@layouts/types/schemas';
  import { CurrentMatch, Score } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import { $ref } from 'vue/macros';
  import { watch } from 'vue';

  const quizScore = useReplicant<Score>('quizScore', 'gtav-tourney-layouts');
  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const timer = useReplicant<Timer>('timer', 'gtav-tourney-layouts');

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

  async function startTimer() {
    try {
      if (phase === 'stopped' || phase === 'paused') {
        await nodecg.sendMessage('timerStart');
      } else if (phase === 'running') {
        await nodecg.sendMessage('timerPause');
      }
    } catch (err) {
      // catch
    }
  }

  async function resetTimer(): Promise<void> {
    try {
      await nodecg.sendMessage('timerReset', true);
    } catch (err) {
      // error
    }
  }

  function increasePlayer110Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player1 += 10;
      quizScore.save();
    }
  }

  function increasePlayer115Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player1 += 15;
      quizScore.save();
    }
  }

  function increasePlayer210Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player2 += 10;
      quizScore.save();
    }
  }

  function increasePlayer215Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player2 += 15;
      quizScore.save();
    }
  }

  function decreasePlayer1Score() {
    if (quizScore && quizScore.data) {
      if (quizScore.data.player1 > 0) {
        quizScore.data.player1 -= 5;
        quizScore.save();
      }
    }
  }

  function decreasePlayer2Score() {
    if (quizScore && quizScore.data) {
      if (quizScore.data.player2 > 0) {
        quizScore.data.player2 -= 5;
        quizScore.save();
      }
    }
  }

  function increasePlayer310Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player3! += 10;
      quizScore.save();
    }
  }

  function increasePlayer315Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player3! += 15;
      quizScore.save();
    }
  }

  function increasePlayer410Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player4! += 10;
      quizScore.save();
    }
  }

  function increasePlayer415Score() {
    if (quizScore && quizScore.data) {
      quizScore.data.player4! += 15;
      quizScore.save();
    }
  }

  function decreasePlayer3Score() {
    if (quizScore && quizScore.data) {
      if (quizScore.data.player3! > 0) {
        quizScore.data.player3! -= 5;
        quizScore.save();
      }
    }
  }

  function decreasePlayer4Score() {
    if (quizScore && quizScore.data) {
      if (quizScore.data.player4! > 0) {
        quizScore.data.player4! -= 5;
        quizScore.save();
      }
    }
  }

  function resetScore() {
    if (quizScore && quizScore.data) {
      quizScore.data.player1 = 0;
      quizScore.data.player2 = 0;
      quizScore.data.player3 = 0;
      quizScore.data.player4 = 0;
      quizScore.save();
    }
  }

  async function fifteenS(): Promise<void> {
    try {
      await nodecg.sendMessage('joker', true);
    } catch (err) {
      // error
    }
  }

  async function fortyfiveS(): Promise<void> {
    try {
      await nodecg.sendMessage('enum', true);
    } catch (err) {
      // error
    }
  }

  async function pauseTimer(): Promise<void> {
    try {
      await nodecg.sendMessage('timerPause', true);
    } catch (err) {
      // error
    }
  }

</script>
