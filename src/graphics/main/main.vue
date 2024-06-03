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
        currentMatch.data.players.player1.name.length > 6 &&
        currentMatch.data.players.player1.name.length <= 9
      "
      src="./img/yellow9.png" />
    <img
      style="position: absolute; z-index: 1"
      v-if="currentMatch && currentMatch.data && currentMatch.data.players.player1.name.length > 9"
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
        currentMatch.data.players.player2.name.length > 6 &&
        currentMatch.data.players.player2.name.length <= 9
      "
      src="./img/pink9.png" />
    <img
      style="position: absolute; z-index: 1"
      v-if="currentMatch && currentMatch.data && currentMatch.data.players.player2.name.length > 9"
      src="./img/pink12.png" />

    <img style="position: absolute; z-index: 1" src="./img/feeds.png" />
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
      <p v-if="playerPbs && playerPbs.data" style="font-size: 38px; margin-top: -19px">
        PB: {{ playerPbs.data.player1 }}
      </p>
    </div>

    <div
      style="position: absolute; bottom: 326px; z-index: 2; width: 88px; height: 88px; left: 41px"
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
      <p
        v-if="playerPbs && playerPbs.data"
        style="font-size: 38px; margin-top: -19px; text-align: right">
        PB: {{ playerPbs.data.player2 }}
      </p>
    </div>

    <div
      style="position: absolute; bottom: 326px; z-index: 2; width: 88px; height: 88px; right: 41px"
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

    <!-- Score -->
    <p
      style="
        position: absolute;
        bottom: 124px;
        left: 924px;
        font-size: 65px;
        display: flex;
        gap: 1px;
      "
      v-if="
        currentMatch && currentMatch.data && currentMatch.data.type != 'bo1' && score && score.data
      ">
      <span>{{ score.data.player1 || 0 }}</span>
      <span>-</span>
      <span>{{ score.data.player2 || 0 }}</span>
    </p>

    <!-- Timer -->
    <p
      v-if="timer && timer.data"
      style="position: absolute; bottom: 150px; width: 100%; text-align: center; font-size: 122px">
      {{ timer.data.time }}
    </p>

    <Omnibar />
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch, CurrentSegment, PlayerPbs, Score, Avatars } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import TopBar from '../components/TopBar.vue';
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
