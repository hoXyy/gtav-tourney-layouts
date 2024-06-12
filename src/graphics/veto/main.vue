<template>
  <TopBar />

  <img src="./img/main.png" style="position: absolute" />

  <!-- Segment Bans -->
  <div
    id="trevisBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Trevor%')
    ">
    <img src="./img/ban/bantrevor.png" style="position: absolute" />
  </div>

  <div
    id="countrysideBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Countryside')
    ">
    <img src="./img/ban/bancountry.png" style="position: absolute" />
  </div>

  <div
    id="blitzBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Blitz Play')
    ">
    <img src="./img/ban/banblitz.png" style="position: absolute" />
  </div>

  <div
    id="deepinsideBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Deep Inside')
    ">
    <img src="./img/ban/bandeep.png" style="position: absolute" />
  </div>

  <div
    id="freshmeatBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Fresh Meat')
    ">
    <img src="./img/ban/banfresh.png" style="position: absolute" />
  </div>

  <div
    id="thirdwayBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'The Third Way')
    ">
    <img src="./img/ban/banttw.png" style="position: absolute" />
  </div>

  <div
    id="asjBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'All Stunt Jumps')
    ">
    <img src="./img/ban/banasj.png" style="position: absolute" />
  </div>

  <div
    id="racesBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'All Races')
    ">
    <img src="./img/ban/banraces.png" style="position: absolute" />
  </div>

  <div
    id="epsilonBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Epsilon Program')
    ">
    <img src="./img/ban/banepsilon.png" style="position: absolute" />
  </div>

  <!-- Player 1 Picks -->
  <div
    id="trevisYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Trevor%') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Trevor%')!)
    ">
    <img src="./img/pick/yellow/pickyellowtrevor.png" style="position: absolute" />
  </div>

  <div
    id="countrysideYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Countryside') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Countryside')!)
    ">
    <img src="./img/pick/yellow/pickyellowcountry.png" style="position: absolute" />
  </div>

  <div
    id="blitzYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Blitz Play') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Blitz Play')!)
    ">
    <img src="./img/pick/yellow/pickyellowblitz.png" style="position: absolute" />
  </div>

  <div
    id="deepinsideYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Deep Inside') &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Deep Inside')!)
    ">
    <img src="./img/pick/yellow/pickyellowdeep.png" style="position: absolute" />
  </div>

  <div
    id="freshmeatYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Fresh Meat') &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Fresh Meat')!)
    ">
    <img src="./img/pick/yellow/pickyellowfresh.png" style="position: absolute" />
  </div>

  <div
    id="thirdwayYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'The Third Way') &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'The Third Way')!)
    ">
    <img src="./img/pick/yellow/pickyellowttw.png" style="position: absolute" />
  </div>

  <div
    id="asjYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps') &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps')!)
    ">
    <img src="./img/pick/yellow/pickyellowasj.png" style="position: absolute" />
  </div>

  <div
    id="racesYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Races') &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'All Races')!)
    ">
    <img src="./img/pick/yellow/pickyellowraces.png" style="position: absolute" />
  </div>

  <div
    id="epsilonYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Epsilon Program') &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Epsilon Program')!)
    ">
    <img src="./img/pick/yellow/pickyellowepsilon.png" style="position: absolute" />
  </div>

  <!-- Player 2 Picks -->
  <div
    id="trevisPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Trevor%') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Trevor%')!)
    ">
    <img src="./img/pick/pink/pickpinktrevor.png" style="position: absolute" />
  </div>

  <div
    id="countrysidePinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Countryside') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Countryside')!)
    ">
    <img src="./img/pick/pink/pickpinkcountry.png" style="position: absolute" />
  </div>

  <div
    id="blitzPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Blitz Play') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Blitz Play')!)
    ">
    <img src="./img/pick/pink/pickpinkblitz.png" style="position: absolute" />
  </div>

  <div
    id="deepinsidePinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Deep Inside') &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Deep Inside')!)
    ">
    <img src="./img/pick/pink/pickpinkdeep.png" style="position: absolute" />
  </div>

  <div
    id="freshmeatPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Fresh Meat') &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Fresh Meat')!)
    ">
    <img src="./img/pick/pink/pickpinkfresh.png" style="position: absolute" />
  </div>

  <div
    id="thirdwayPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'The Third Way') &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'The Third Way')!)
    ">
    <img src="./img/pick/pink/pickpinkttw.png" style="position: absolute" />
  </div>

  <div
    id="asjPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps') &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps')!)
    ">
    <img src="./img/pick/pink/pickpinkasj.png" style="position: absolute" />
  </div>

  <div
    id="racesPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Races') &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'All Races')!)
    ">
    <img src="./img/pick/pink/pickpinkraces.png" style="position: absolute" />
  </div>

  <div
    id="epsilonPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Epsilon Program') &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Epsilon Program')!)
    ">
    <img src="./img/pick/pink/pickpinkepsilon.png" style="position: absolute" />
  </div>

  <PlayerInfo />
  <MatchInfo />
  <Omnibar />
</template>

<script setup lang="ts">
  import MatchInfo from '../components/MatchInfo.vue';
  import TopBar from '../components/TopBar.vue';
  import Omnibar from '../components/Omnibar.vue';
  import { useReplicant } from 'nodecg-vue-composable';
  import PlayerInfo from './components/PlayerInfo.vue';
  import { CurrentMatch, CurrentSegment } from '@layouts/types';

  const segmentPicks = useReplicant<CurrentSegment[]>('segmentPicks', 'gtav-tourney-layouts', {
    defaultValue: [],
  });
  const segmentBans = useReplicant<CurrentSegment[]>('segmentBans', 'gtav-tourney-layouts', {
    defaultValue: [],
  });

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');

  function isPickedByPlayer1(segment: CurrentSegment) {
    if (currentMatch && currentMatch.data && segment.pickedBy) {
      return segment.pickedBy === currentMatch.data.players.player1.name;
    } else {
      return false;
    }
  }

  function isPickedByPlayer2(segment: CurrentSegment) {
    if (currentMatch && currentMatch.data && segment.pickedBy) {
      return segment.pickedBy === currentMatch.data.players.player2.name;
    } else {
      return false;
    }
  }
</script>

<style>
  @import url('../css/base.css');
</style>
