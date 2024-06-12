<template>
  <TopBar />

  <img src="./img/main.png" style="position: absolute" />

  <!-- Segment Bans -->
  <div
    id="trevis"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Trevor%')
    ">
    <img src="./img/ban/bantrevor.png" style="position: absolute" />
  </div>

  <div
    id="countryside"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Countryside')
    ">
    <img src="./img/ban/bancountry.png" style="position: absolute" />
  </div>

  <div
    id="blitz"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Blitz Play')
    ">
    <img src="./img/ban/banblitz.png" style="position: absolute" />
  </div>

  <div
    id="deepinside"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Deep Inside')
    ">
    <img src="./img/ban/bandeep.png" style="position: absolute" />
  </div>

  <div
    id="freshmeat"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Fresh Meat')
    ">
    <img src="./img/ban/banfresh.png" style="position: absolute" />
  </div>

  <div
    id="thirdway"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'The Third Way')
    ">
    <img src="./img/ban/banttw.png" style="position: absolute" />
  </div>

  <div
    id="asj"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'All Stunt Jumps')
    ">
    <img src="./img/ban/banasj.png" style="position: absolute" />
  </div>

  <div
    id="races"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'All Races')
    ">
    <img src="./img/ban/banraces.png" style="position: absolute" />
  </div>

  <div
    id="epsilon"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Epsilon Program')
    ">
    <img src="./img/ban/banepsilon.png" style="position: absolute" />
  </div>

  <PlayerInfo />
  <MatchInfo />
  <Omnibar />
</template>

<script setup lang="ts">
  import MatchInfo from '../components/MatchInfo.vue'
  import TopBar from '../components/TopBar.vue';
  import Omnibar from '../components/Omnibar.vue';
  import { useReplicant } from 'nodecg-vue-composable';
  import { CurrentSegment } from '@layouts/types';
  import PlayerInfo  from './components/PlayerInfo.vue'

  const segmentPicks = useReplicant<CurrentSegment[]>('segmentPicks', 'gtav-tourney-layouts', {
    defaultValue: [],
  });
  const segmentBans = useReplicant<CurrentSegment[]>('segmentBans', 'gtav-tourney-layouts', {
    defaultValue: [],
  });
</script>

<style>
  @import url('../css/base.css');
</style>
