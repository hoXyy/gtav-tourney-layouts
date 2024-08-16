<template>
  <div>
    <TopBar />
    <div
      id="background"
      style="
        position: absolute; /* Ensure background is positioned properly */
        top: 0;
        left: 0;
        width: 100vw; /* Full viewport width */
        height: 100vh; /* Full viewport height */
        overflow: hidden; /* Prevent overflow */
        z-index: 0; /* Ensure it is at the bottom */
      "
    >
      <img
        class="bg"
        src="./img/background.png"
        style="
          position: absolute; /* Ensure image covers the background */
          width: 100%; /* Stretch to cover the background div */
          height: 100%; /* Stretch to cover the background div */
          object-fit: cover; /* Maintain aspect ratio while covering the element */
        "
      />
    </div>

    <div
      id="container"
    >
      <!-- Player 1 Data -->
      <div
        id="player1"
        class="movable"
        style="
          position: absolute;
          z-index: 2;
          bottom: 701px;
          left: 0px;
        "
      >
        <div
          style="
            font-size: 78px;
            height: 150px;
            color: black;
            line-height: 0px;
            font-family: 'Europa Grotesk SH DemBol';
            position: relative; /* Make this position relative for internal adjustments */
            left: 100px; /* Move the name to the right by 100px */
          "
          v-if="currentMatch && currentMatch.data"
        >
          <p>{{ currentMatch.data.players.player1.name }}</p>
        </div>

        <div
          style="
            width: 84px;
            height: 84px;
            position: absolute;
            bottom: 120px;
            left: 19px;
            object-fit: contain;
            overflow: hidden;
            z-index: 2;
          "
          v-if="currentMatch && currentMatch.data"
        >
          <img
            v-if="
              currentMatch.data.players.player1.showAvatar &&
              avatars &&
              avatars.data &&
              avatars.data.player1
            "
            width="84"
            :src="avatars.data.player1"
          />
          <img v-else width="84" src="../img/nopic.png" />
        </div>
        <div style="
            font-size: 78px;
            height: 375px;
            color: black;
            line-height: 0px;
            font-family: 'Europa Grotesk SH DemBol';
            position: relative; /* Make this position relative for internal adjustments */
            left: 00px; /* Move the name to the right by 100px */
            z-index:2;
          ">
          <img
          src="./img/pink.png"
        />
        </div>
      </div>

      <!-- Player 2 Data -->
      <div
        id="player2"
        class="movable"
        style="
          position: absolute;
          z-index: 1;
          bottom: 446px;
          left: 150px;
        "
      >
        <div
          style="
            font-size: 78px;
            height: 150px;
            color: white;
            line-height: 0px;
            font-family: 'Europa Grotesk SH DemBol';
          "
          v-if="currentMatch && currentMatch.data"
        >
          <p>{{ currentMatch.data.players.player2.name }}</p>
        </div>

        <div
          style="
            width: 84px;
            height: 84px;
            position: absolute;
            bottom: 100px;
            left: 31px;
            object-fit: contain;
            overflow: hidden;
            z-index: 1;
          "
          v-if="currentMatch && currentMatch.data"
        >
          <img
            v-if="
              currentMatch.data.players.player2.showAvatar &&
              avatars &&
              avatars.data &&
              avatars.data.player2
            "
            width="84"
            :src="avatars.data.player2"
          />
          <img v-else width="84" src="../img/nopic.png" />
        </div>
        <img
          src="./img/yellow.png"
          style="position: absolute; z-index: 1;"
        />
      </div>

      <!-- Player 3 Data -->
      <div
        id="player3"
        class="movable"
        style="
          position: absolute;
          z-index: 0;
          bottom: 200px;
          left: 150px;
        "
      >
        <div
          style="
            font-size: 78px;
            height: 150px;
            color: white;
            line-height: 0px;
            font-family: 'Europa Grotesk SH DemBol';
          "
          v-if="currentMatch && currentMatch.data"
        >
          <p>{{ currentMatch.data.players.player3.name }}</p>
        </div>

        <div
          style="
            width: 84px;
            height: 84px;
            position: absolute;
            bottom: 0px;
            left: 31px;
            object-fit: contain;
            overflow: hidden;
            z-index: 0;
          "
          v-if="currentMatch && currentMatch.data"
        >
          <img
            v-if="
              currentMatch.data.players.player3.showAvatar &&
              avatars &&
              avatars.data &&
              avatars.data.player3
            "
            width="84"
            :src="avatars.data.player3"
          />
          <img v-else width="84" src="../img/nopic.png" />
        </div>
        <img
          src="./img/purple.png"
          style="position: absolute; z-index: 0;"
        />
      </div>

      <!-- Player 4 Data -->
      <div
        id="player4"
        class="movable"
        style="
          position: absolute;
          bottom: 100px;
          left: 150px;
        "
      >
        <div
          style="
            font-size: 78px;
            height: 150px;
            color: white;
            line-height: 0px;
            font-family: 'Europa Grotesk SH DemBol';
          "
          v-if="currentMatch && currentMatch.data"
        >
          <p>{{ currentMatch.data.players.player4.name }}</p>
        </div>

        <div
          style="
            width: 84px;
            height: 84px;
            position: absolute;
            bottom: 166px;
            left: 31px;
            object-fit: contain;
            overflow: hidden;
          "
          v-if="currentMatch && currentMatch.data"
        >
          <img
            v-if="
              currentMatch.data.players.player4.showAvatar &&
              avatars &&
              avatars.data &&
              avatars.data.player4
            "
            width="84"
            :src="avatars.data.player4"
          />
          <img v-else width="84" src="../img/nopic.png" />
        </div>
        <img
          src="./img/teal.png"
          style="position: absolute; z-index: 4;"
        />
      </div>
    </div>

    <!-- Timer -->
    <p
      v-if="timer && timer.data"
      style="
        position: absolute;
        bottom: 150px;
        width: 100%;
        text-align: center;
        font-size: 122px;
        z-index: 3; /* Ensure timer is above other elements */
      "
    >
      {{ timer.data.time }}
    </p>
    <img
      src="./img/bobar.png"
      style="
        position: absolute;
        z-index: 2;
        bottom: 0px;
      "
    />
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
  import { nextTick } from 'vue';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');
  const playerPbs = useReplicant<PlayerPbs>('playerPbs', 'gtav-tourney-layouts');
  const score = useReplicant<Score>('score', 'gtav-tourney-layouts');
  const timer = useReplicant<Timer>('timer', 'gtav-tourney-layouts');
  const avatars = useReplicant<Avatars>('playerAvatars', 'gtav-tourney-layouts');

  type Position = {
    x: number;
    y: number;
  }

  const positions: Position[] = [
    {x: 0, y:0},
    {x: 0, y:0},
    {x: 0, y:0},
    {x: 0, y:0}
  ]

  const mapDivs: { [key: string]: number} = {
    player1: 0,
    player2: 1,
    player3: 2,
    player4: 3
  };

  function moveDivs() {
    const divs = document.querySelectorAll('.movable');

    divs.forEach(div => {
      const id = div.id;
      const index = mapDivs[id];

      if(index !== undefined) {
        const position = positions[index];
        (div as HTMLElement).style.transform = `translate(${position.x}px, ${position.y}px)`;
        (div as HTMLElement).style.position = 'absolute';
      }
    })
  }

  nextTick(() => {
    moveDivs();
  });
</script>

<style>
  @import url('../css/base.css');
</style>
