<template>
  <div>
    <TopBar />
    <img
      style="position: absolute"
      v-if="currentMatch && currentMatch.data && currentMatch.data.type != 'bo1'"
      src="./img/boprogress.png" />

    <!-- Segment pick backgrounds -->
    <img
      style="position: absolute; z-index: 0"
      src="./img/pinkpick.png"
      v-if="
        currentMatch &&
        currentMatch.data &&
        currentSegment &&
        currentSegment.data &&
        currentSegment.data.pickedBy === currentMatch.data.players.player2.name
      " />
    <img
      style="position: absolute; z-index: 0"
      src="./img/yellowpick.png"
      v-if="
        currentMatch &&
        currentMatch.data &&
        currentSegment &&
        currentSegment.data &&
        currentSegment.data.pickedBy === currentMatch.data.players.player1.name
      " />

    <!-- Player 1 name backgrounds -->
    <img
      style="position: absolute; z-index: 1"
      v-if="currentMatch && currentMatch.data && currentMatch.data.players.player1.name.length <= 6"
      src="./img/yellow6.png" />
    <img
      style="position: absolute; z-index: 1"
      v-if="
        currentMatch &&
        currentMatch.data &&
        currentMatch.data.players.player1.name.length >= 6 &&
        currentMatch.data.players.player1.name.length <= 9
      "
      src="./img/yellow9.png" />
    <img
      style="position: absolute; z-index: 1"
      v-if="currentMatch && currentMatch.data && currentMatch.data.players.player1.name.length >= 9"
      src="./img/yellow12.png" />

    <!-- Player 2 name backgrounds -->
    <img
      style="position: absolute; z-index: 1"
      v-if="currentMatch && currentMatch.data && currentMatch.data.players.player2.name.length <= 6"
      src="./img/pink6.png" />
    <img
      style="position: absolute; z-index: 1"
      v-if="
        currentMatch &&
        currentMatch.data &&
        currentMatch.data.players.player2.name.length >= 6 &&
        currentMatch.data.players.player2.name.length <= 9
      "
      src="./img/pink9.png" />
    <img
      style="position: absolute; z-index: 1"
      v-if="currentMatch && currentMatch.data && currentMatch.data.players.player2.name.length >= 9"
      src="./img/pink12.png" />
    <div id="background">
      <img class="bg" src="./img/background.png" />
    </div>
    <Omnibar />
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch, CurrentSegment, PlayerPbs } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import TopBar from '../components/TopBar.vue';
  import Omnibar from '../components/Omnibar.vue';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');
  const playerPbs = useReplicant<PlayerPbs>('playerPbs', 'gtav-tourney-layouts');
</script>

<style>
  @import url('../css/base.css');
</style>
