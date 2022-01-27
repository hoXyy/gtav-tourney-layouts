<template>
  <v-app>
    <v-container fluid class="text-center">
      <h1 style="font-size: 48px">{{ timer.time }}</h1>
    </v-container>
    <v-container
      fluid
      class="d-flex text-center"
      style="justify-content: space-between"
    >
      <v-btn width="45%" @click="startTimer">{{
        phase === "running" ? "Pause Timer" : "Start Timer"
      }}</v-btn>
      <v-btn width="45%" @click="resetTimer" :disabled="phase === 'stopped'">Reset Timer</v-btn>
    </v-container>
    <div style="width: 100%; display: flex; flex-direction: column">
      <v-btn width="100%" class="my-2">Finish Player 1</v-btn>
      <v-btn width="100%">Finish Player 2</v-btn>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import type { Timer } from "@layouts/types/schemas";
import { Getter } from "vuex-class";
// import { replicantNS } from '@layouts/browser_shared/replicant_store';

@Component
export default class extends Vue {
  @Getter readonly timer!: Timer; // from store.ts

  // If you want to just read a replicant without assigning a getter anywhere, you can do this too.
  /* @replicantNS.State(
    (s) => s.reps.exampleReplicant,
  ) readonly exampleReplicant!: ExampleReplicant; */

  get phase() {
    return this.timer.phase;
  }

  async startTimer(): Promise<void> {
    try {
      if (this.phase === "stopped" || this.phase === "paused") {
        await nodecg.sendMessage("timerStart");
      } else if (this.phase === "running") {
        await nodecg.sendMessage("timerPause");
      }
    } catch (err) {
      // catch
    }
  }

  async resetTimer(): Promise<void> {
    try {
      await nodecg.sendMessage("timerReset", true);
    } catch (err) {
      // error
    }
  }
}
</script>
