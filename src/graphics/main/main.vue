<template>
  <div>
    <img id="background" src="./img/main.png" />
    <div id="on-deck">
      <p style="font-size: 52px">Commentators</p>
      <p>{{ commentators }}</p>
    </div>
    <div class="player" id="player1">
      <p
        id="player1-name"
        style="font-family: Myriad Pro Bold; font-size: 72px"
      >
        hossel_
      </p>
      <p id="player1-pb" style="font-size: 32px">5:45:55 (60th)</p>
    </div>
    <div class="player" id="player2">
      <p
        id="player2-name"
        style="font-family: Myriad Pro Bold; font-size: 72px"
      >
        TwistedTammer
      </p>
      <p id="player2-pb" style="font-size: 32px">5:45:55 (60th)</p>
    </div>
    <div id="timer">{{ timer.time }}</div>
    <div id="tourney-stage">
      <p id="tourney-stage-name"><b>{{ matchInfo.stage }}</b></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
// import { replicantNS } from '@layouts/browser_shared/replicant_store';
import type { Timer, Matchinfo, Commentators } from "@layouts/types/schemas";
import fitty, { FittyInstance } from "fitty";

@Component
export default class extends Vue {
  @Getter readonly timer!: Timer; // from store.ts
  @Getter readonly matchInfo!: Matchinfo; // from store.ts
  @Getter readonly commentators!: Commentators;

  fittyName1: FittyInstance | undefined;
  fittyName2: FittyInstance | undefined;
  fittyStage: FittyInstance | undefined;

  fit(): void {
    [this.fittyName1] = fitty("#player1-name", {
      minSize: 1,
      maxSize: 72,
    });
    [this.fittyName2] = fitty("#player1-name", {
      minSize: 1,
      maxSize: 72,
    });
    [this.fittyStage] = fitty("#tourney-stage-name", {
      minSize: 1,
      maxSize: 60,
    });
  }

  mounted() {
    this.fit();
  }
}
</script>

<style>
@import url("../css/base.css");

#on-deck {
  font-family: "signpainter_housescriptRg";
  color: white;
  position: absolute;
  bottom: 5px;
  left: 45px;
  font-size: 72px;
  line-height: 1px;
}

#background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#tourney-stage {
  color: white;
  position: absolute;
  font-size: 60px;
  right: 40px;
  font-family: "Trebuchet MS";
  width: 800px;
  text-align: center;
  height: 100px;
  top: 20px;
  line-height: 0px;
  text-transform: uppercase;
}

#timer {
  color: white;
  font-family: "ChaletComprime-CologneSixty";
  font-size: 128px;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 200px;
}

.player {
  color: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  /*   background-color: rgba(255, 255, 255, 0.5); */
  width: 38%;
  line-height: 0px;
}
#player1 {
  bottom: 209px;
  left: 120px;
}

.player > p {
  margin: 25px;
}

#player2 {
  bottom: 209px;
  right: 120px;
  text-align: right;
}
</style>
