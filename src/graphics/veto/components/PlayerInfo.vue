<template>
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

  <!-- Player 1 data -->
  <div
    style="
      position: absolute;
      z-index: 2;
      bottom: 601px;
      right: 150px;
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
      bottom: 620px;
      z-index: 2;
      width: 102px;
      height: 102px;
      right: 30px;
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
      width="102"
      :src="avatars.data.player1" />
    <img v-else width="102" src="../../img/nopic.png" />
  </div>

  <!-- Player 2 data -->
  <div
    style="
      position: absolute;
      z-index: 2;
      bottom: 346px;
      right: 150px;
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
      bottom: 366px;
      z-index: 2;
      width: 102px;
      height: 102px;
      right: 31px;
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
      width="102"
      :src="avatars.data.player2" />
    <img v-else width="102" src="../../img/nopic.png" />
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { Avatars, CurrentMatch } from '@layouts/types';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const avatars = useReplicant<Avatars>('playerAvatars', 'gtav-tourney-layouts');
</script>

<style>
  @import url('../../css/base.css');
</style>
