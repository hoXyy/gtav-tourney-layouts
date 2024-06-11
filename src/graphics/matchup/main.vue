<template>
  <div>
    <TopBar />
    <Omnibar />

    <!-- Player 1 data -->
    <div
      style="position: absolute; top: 353.5px; left: 309.5px; z-index: 2; width: 267px; height: auto;"
      v-if="currentMatch && currentMatch.data">
      <img
        v-if="
          currentMatch.data.players.player1.showAvatar &&
          avatars &&
          avatars.data &&
          avatars.data.player1
        "
        :style="{ width: '267px', height: '267px' }"
        :src="avatars.data.player1" />
      <img v-else :style="{ width: '267px', height: '267px' }" src="./img/nopic.png" />
    </div>

    <div
      style="
        position: absolute;
        z-index: 2;
        bottom: 262px;
        left: 443.5px; 
        font-size: 96px;
        height: 130px;
        color: black;
        line-height: 0px;
        transform: translateX(-50%); 
      "
      v-if="currentMatch && currentMatch.data">
      <p style="
          font-family: 'Europa Grotesk SH DemBol'; 
          text-align: center;
          margin: 0; 
      ">
        {{ currentMatch.data.players.player1.name }}
      </p>
    </div>

    <!-- Player 2 data -->
    <div
      style="position: absolute; top: 353.5px; left: 1343.5px; z-index: 2; width: 100%; height: auto;"
      v-if="currentMatch && currentMatch.data">
      <img
        v-if="
          currentMatch.data.players.player2.showAvatar &&
          avatars &&
          avatars.data &&
          avatars.data.player2
        "
        :style="{ width: '267px', height: '267px' }"
        :src="avatars.data.player2" />
      <img v-else :style="{ width: '267px', height: '267px' }" src="./img/nopic.png" />
    </div>

    <div
      style="
        position: absolute;
        z-index: 2;
        bottom: 392px;
        left: 1478px;
        font-size: 96px;
        color: white;
        line-height: 0px;
        transform: translateX(-50%); 
      "
      v-if="currentMatch && currentMatch.data">
      <p style="
        font-family: 'Europa Grotesk SH DemBol';  
        text-align: center;
        margin: 0; 
      ">
        {{ currentMatch.data.players.player2.name }}
      </p>
    </div>

    <div>
      <img src="./img/main.png" />
    </div>

    <MatchInfo />
    <Omnibar />
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch, CurrentSegment, PlayerPbs, Score, Avatars } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import TopBar from '../components/TopBar.vue';
  import MatchInfo from '../components/MatchInfo.vue';
  import Omnibar from '../components/Omnibar.vue';
  import { Timer } from '@layouts/types/schemas';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');
  const playerPbs = useReplicant<PlayerPbs>('playerPbs', 'gtav-tourney-layouts');
  const score = useReplicant<Score>('score', 'gtav-tourney-layouts');
  const timer = useReplicant<Timer>('timer', 'gtav-tourney-layouts');
  const avatars = useReplicant<Avatars>('playerAvatars', 'gtav-tourney-layouts');
</script>

<style>
  @import url('../css/base.css');
</style>
