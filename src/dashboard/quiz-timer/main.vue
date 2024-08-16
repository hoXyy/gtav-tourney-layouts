<template>
    <div v-if="timer && timer.data" style="display: flex; flex-direction: column; gap: 5px">
      <div style="width: 100%; text-align: center">
        <h1 style="font-size: 48px">
          <b>{{ timer.data.time }}</b>
        </h1>
      </div>
      <div style="display: flex; text-align: center; justify-content: space-between; width: 100%">
        <QBtn width="45%" color="black" @click="startTimer" :disable="phase === 'finished'">{{
          phase === 'running' ? 'Pause Timer' : 'Start Timer'
        }}</QBtn>
        <QBtn width="45%" color="black" @click="resetTimer" :disable="phase === 'stopped'"
          >Reset Timer</QBtn
        >
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { Timer } from '@layouts/types/schemas';
    import { CurrentMatch, Score, FinishTimes } from '@layouts/types';
    import { useReplicant } from 'nodecg-vue-composable';
    import { $ref } from 'vue/macros';
    import { watch } from 'vue';
  
    const score = useReplicant<Score>('score', 'gtav-tourney-layouts');
    const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
    const finishTimes = useReplicant<FinishTimes>('finishTimes', 'gtav-tourney-layouts');
    const timer = useReplicant<Timer>('timer', 'gtav-tourney-layouts');
  
    let phase = $ref('');
  
    watch(
      () => timer?.data,
      (val) => {
        if (val) phase = val.phase;
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
  </script>
  