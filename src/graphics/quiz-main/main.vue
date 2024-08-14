<template>
    <div>
      <TopBar />
  
      <div id="background">
        <img class="bg" src="./img/background.png" />
      </div>
  
      <!-- Player 1 Data -->
      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 321px;
          left: 144px;
          font-size: 78px;
          height: 150px;
          color: black;
          line-height: 0px;
        "
        v-if="currentMatch && currentMatch.data">
        <p style="font-family: 'Europa Grotesk SH DemBol'">
          {{ currentMatch.data.players.player1.name }}
        </p>
      </div>
  
      <div
        style="
          position: absolute;
          bottom: 326px;
          z-index: 2;
          width: 88px;
          height: 88px;
          left: 41px;
          object-fit: contain;
          overflow: hidden;
        "
        v-if="currentMatch && currentMatch.data">
        <img
          v-if="
            currentMatch.data.players.player1.showAvatar &&
            avatars &&
            avatars.data &&
            avatars.data.player1
          "
          width="88"
          :src="avatars.data.player1" />
        <img v-else width="88" src="../img/nopic.png" />
      </div>
  
      <!-- Player 2 Data -->
      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 321px;
          right: 144px;
          font-size: 78px;
          height: 150px;
          color: white;
          line-height: 0px;
        "
        v-if="currentMatch && currentMatch.data">
        <p style="font-family: 'Europa Grotesk SH DemBol'">
          {{ currentMatch.data.players.player2.name }}
        </p>
      </div>
  
      <div
        style="
          position: absolute;
          bottom: 326px;
          z-index: 2;
          width: 88px;
          height: 88px;
          right: 41px;
          object-fit: contain;
          overflow: hidden;
        "
        v-if="currentMatch && currentMatch.data">
        <img
          v-if="
            currentMatch.data.players.player2.showAvatar &&
            avatars &&
            avatars.data &&
            avatars.data.player2
          "
          width="88"
          :src="avatars.data.player2" />
        <img v-else width="88" src="../img/nopic.png" />
      </div>
  
      <!-- Player 3 Data -->
      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 321px;
          right: 144px;
          font-size: 78px;
          height: 150px;
          color: white;
          line-height: 0px;
        "
        v-if="currentMatch && currentMatch.data">
        <p style="font-family: 'Europa Grotesk SH DemBol'">
          {{ currentMatch.data.players.player2.name }}
        </p>
      </div>
  
      <div
        style="
          position: absolute;
          bottom: 326px;
          z-index: 2;
          width: 88px;
          height: 88px;
          right: 41px;
          object-fit: contain;
          overflow: hidden;
        "
        v-if="currentMatch && currentMatch.data">
        <img
          v-if="
            currentMatch.data.players.player2.showAvatar &&
            avatars &&
            avatars.data &&
            avatars.data.player2
          "
          width="88"
          :src="avatars.data.player2" />
        <img v-else width="88" src="../img/nopic.png" />
      </div>
  
      <!-- Player 4 Data -->
      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 321px;
          right: 144px;
          font-size: 78px;
          height: 150px;
          color: white;
          line-height: 0px;
        "
        v-if="currentMatch && currentMatch.data">
        <p style="font-family: 'Europa Grotesk SH DemBol'">
          {{ currentMatch.data.players.player2.name }}
        </p>
      </div>
  
      <div
        style="
          position: absolute;
          bottom: 326px;
          z-index: 2;
          width: 88px;
          height: 88px;
          right: 41px;
          object-fit: contain;
          overflow: hidden;
        "
        v-if="currentMatch && currentMatch.data">
        <img
          v-if="
            currentMatch.data.players.player2.showAvatar &&
            avatars &&
            avatars.data &&
            avatars.data.player2
          "
          width="88"
          :src="avatars.data.player2" />
        <img v-else width="88" src="../img/nopic.png" />
      </div>
  
      <!-- Timer -->
      <p
        v-if="timer && timer.data"
        style="position: absolute; bottom: 150px; width: 100%; text-align: center; font-size: 122px">
        {{ timer.data.time }}
      </p>
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
    const timer = useReplicant<Timer>('quiz-timer', 'gtav-tourney-layouts');
    const avatars = useReplicant<Avatars>('playerAvatars', 'gtav-tourney-layouts');
  </script>
  
  <style>
    @import url('../css/base.css');
  </style>
  