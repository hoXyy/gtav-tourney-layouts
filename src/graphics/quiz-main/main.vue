<template>
  <div>
    <TopBar />
    
    <!-- Background -->
    <div id="background">
      <img class="bg" src="./img/background.png" />
    </div>

    <!-- Main Container -->
    <div id="container">
      <!-- Player 1 Data -->
      <div id="player1" class="movable player-section player1">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name1">
            {{ currentMatch.data.players.player1.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar1"
            v-bind:src="currentMatch.data.players.player1.showAvatar && avatars?.data?.player1 ? avatars.data.player1 : '../img/nopic.png'"
          />
        </div>
        <img src="./img/pink.png" class="color-overlay color-pink" />
      </div>

      <!-- Player 2 Data -->
      <div id="player2" class="movable player-section player2">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name2">
            {{ currentMatch.data.players.player2.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar2"
            v-bind:src="currentMatch.data.players.player2.showAvatar && avatars?.data?.player2 ? avatars.data.player2 : '/img/nopic.png'"
          />
        </div>
        <img src="./img/yellow.png" class="color-overlay color-yellow" />
      </div>

      <!-- Player 3 Data -->
      <div id="player3" class="movable player-section player3">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name3">
            {{ currentMatch.data.players.player3.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar3"
            v-bind:src="currentMatch.data.players.player3.showAvatar && avatars?.data?.player3 ? avatars.data.player3 : require('../img/nopic.png')"
          />
        </div>
        <img src="./img/purple.png" class="color-overlay color-purple" />
      </div>

      <!-- Player 4 Data -->
      <div id="player4" class="movable player-section player4">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name4">
            {{ currentMatch.data.players.player4.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar4"
            v-bind:src="currentMatch.data.players.player4.showAvatar && avatars?.data?.player4 ? avatars.data.player4 : '../img/nopic.png'"
          />
        </div>
        <img src="./img/teal.png" class="color-overlay color-teal" />
      </div>
    </div>

    <!-- Timer -->
    <p v-if="timer && timer.data" class="timer">
      {{ timer.data.time }}
    </p>

    <!-- Bobar -->
    <img src="./img/bobar.png" class="bottom-overlay" />
    <div id="scores" class="scores">
      <p class="score1" v-if="score && score.data">
          {{ score.data.player1 }} POINTS <br>
      </p>
      <p class="score2" v-if="score && score.data">
          {{ score.data.player2 }} POINTS
      </p>
      <p class="score3" v-if="score && score.data">
          {{ score.data.player3 }} POINTS
      </p>
      <p class="score4" v-if="score && score.data">
          {{ score.data.player4 }} POINTS
      </p>
    </div>
    <div id="names" class="score-names">
      <p class="score-name1" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player1.name }}'s SCORE
      </p>
      <p class="score-name2" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player2.name }}'s SCORE
      </p>
      <p class="score-name3" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player3.name }}'s SCORE
      </p>
      <p class="score-name4" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player4.name }}'s SCORE
      </p>
    </div>

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
  import { nextTick, watch } from 'vue';

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

  const basePosition: Position = { x:0, y:300}; //TODO
  
  const positions: Position[] = [
    {x: 0, y: 300},  // Adjusted for player1
    {x: 0, y: 300},  // Adjusted for player2
    {x: 0, y: 300},  // Adjusted for player3
    {x: 0, y: 300}   // Adjusted for player4
  ]

  const mapDivs: { [key: string]: number} = {
    player1: 0,
    player2: 1,
    player3: 2,
    player4: 3
  };

  function moveDivs() {
    if (!score?.data || !currentMatch?.data) return;
    
    const players = [
      { id: 'player1', score: score.data.player1, positionIndex: mapDivs.player1},
      { id: 'player2', score: score.data.player2, positionIndex: mapDivs.player2},
      { id: 'player3', score: score.data.player3, positionIndex: mapDivs.player3},
      { id: 'player4', score: score.data.player4, positionIndex: mapDivs.player4},
    ]

    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
      const div = document.getElementById(player.id);
      if (div) {
        const position = { ...basePosition, y: basePosition.y + index * 150}; //TODO
        div.style.transform = `translate(${position.x}px, ${position.y}px)`;
        div.style.position = 'absolute';
      }
    });
    }

    if (score) {
      watch(score, () => {
        nextTick(() => {
        moveDivs();
      })
    })
    }

  nextTick(() => {
    moveDivs();
  });
</script>

<style>

  @font-face {
    font-family: 'Europa Grotesk SH DemBol';
    src: url('../css/fonts/europa/EuropaGroteskSH-DemBol.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('../css/fonts/bebas/BebasNeue-Regular.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }

  /* Reset and layout for the container */
  #background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 0; /* Background image at the lowest level */
  }

  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Container with player sections and color overlays */
  #container {
    position: relative;
    z-index: 1; 
  }

  .movable {
    position: absolute;
    z-index: 3; /* Ensure it is above color overlays */
  }

  .player-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .player-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .player-avatar {
    width: 78px;
    height: 78px;
    object-fit: contain;
    z-index: 4;
    position: relative;
  }

  /* Adjust avatar position for Players */
  .player-avatar1 { position:absolute; top: -62px; left: 21px; } 
  .player-avatar2 { position:absolute; top: 86px; left: 21px; }
  .player-avatar3 { position:absolute; top: 245px; left: 21px; }
  .player-avatar4 { position:absolute; top: 406px; left: 21px; } 

  .player-name {
    font-size: 70px;
    color: black;
    line-height: 0;
    font-family: 'Europa Grotesk SH DemBol';
    position: relative;
    z-index: 4; /* Ensure names are on top of color overlays */
  }

  /* Adjust name position for Players */
  .player-name1 { top: -94px; left: 120px; color: white } 
  .player-name2 { top: 54px; left: 120px; } 
  .player-name3 { top: 213px; left: 120px; color: white } 
  .player-name4 { top: 373px; left: 120px; } 

  .color-overlay {
    position: absolute;
    z-index: 2; /* Ensure color overlays are below player names but above the background */
  }

  .color-pink { top: -250px; left: 0; }
  .color-yellow { top: -250px; left: 0; }
  .color-purple { top: -250px; left: 0; }
  .color-teal { top: -250px; left: 0; }

  .timer {
    position: absolute;
    bottom: 150px;
    width: 100%;
    font-family: "Bebas Neue";
    text-align: center;
    font-size: 122px;
    z-index: 5; /* Ensure timer is above all player and color overlays */
  }

  .bottom-overlay {
    position: absolute;
    bottom: 0;
    z-index: 2; /* Ensure bottom overlay is above the background but below other elements */
  }

  .scores {
    position: absolute;
    bottom: 150px;
    width: 100%;
    font-family: "Bebas Neue";
    text-align: center;
    font-size: 65px;
    z-index: 5; /* Ensure scores are above all player and color overlays */
  }

  /* Adjust score styling */
  .score1 { position: relative; top: 583px; left: -50px; } 
  .score2 { position: relative; top: 433px; left: 188px; } 
  .score3 { position: relative; top: 283px; left: 426px; } 
  .score4 { position: relative; top: 133px; left: 664px; } 

  .score-names {
    position: absolute;
    bottom: 150px;
    width: 100%;
    font-family: "Bebas Neue";
    text-align: center;
    font-size: 30px;
    z-index: 5; /* Ensure scores are above all player and color overlays */
  }

  /* Adjust score styling */
  .score-name1 { position: relative; top: 327px; left: -50px; color: #ff1b62} 
  .score-name2 { position: relative; top: 257px; left: 188px; color: #ffde1b} 
  .score-name3 { position: relative; top: 187px; left: 428px; color: #9c39ff} 
  .score-name4 { position: relative; top: 117px; left: 664px; color: #00ff9d} 

</style>
