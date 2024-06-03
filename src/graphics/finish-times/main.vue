<template>
  <img
    src="./img/finish1.png"
    style="position: absolute"
    v-if="finishTimes && finishTimes.data && finishTimes.data.player1" />
  <img
    src="./img/finish2.png"
    style="position: absolute"
    v-if="finishTimes && finishTimes.data && finishTimes.data.player2" />
  <p
    style="position: absolute; top: 170px; left: 325px; font-size: 122px"
    v-if="finishTimes && finishTimes.data && finishTimes.data.player1">
    {{ finishTimes.data.player1 }}
  </p>
  <p
    style="position: absolute; top: 170px; right: 325px; font-size: 122px"
    v-if="finishTimes && finishTimes.data && finishTimes.data.player2">
    {{ finishTimes.data.player2 }}
  </p>
</template>

<script setup lang="ts">
  import { FinishTimes } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  const finishTimes = useReplicant<FinishTimes>('finishTimes', 'gtav-tourney-layouts');
</script>

<style>
  @import url('../css/base.css');
</style>
