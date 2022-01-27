<template>
  <v-app>
    <v-select
      :items="segments"
      v-model="segment"
      dense
      filled
      :height="50"
      label="Segment (used for getting correct runners' PB)"
    />
    <v-text-field v-model="stage" filled label="Tournament Stage" />
    <v-btn @click="updateMatchInfo" width="100%" class="my-5">Update Match Info</v-btn>
    <div style="display: flex; flex-direction: row; width: 100%">
      <div id="player1" style="margin-right: 10px; width: 50%">
        <v-text-field filled label="Nickname" />
        <v-text-field filled label="Speedrun.com name" />
        <v-checkbox v-model="manual_pb1" label="Set PB manually" />
        <v-text-field :disabled="!manual_pb1" filled label="PB" />
        <v-btn width="100%">Update Player 1</v-btn>
      </div>
      <div
        id="divider"
        style="height: 100%; margin-right: 30px; margin-left: 6px"
      >
        <h2 style="margin: auto; position: absolute; top: 50%">vs</h2>
      </div>

      <div id="player2" style="margin-left: 10px; width: 50%">
        <v-text-field filled label="Nickname" />
        <v-text-field filled label="Speedrun.com name" />
        <v-checkbox v-model="manual_pb2" label="Set PB manually" />
        <v-text-field :disabled="!manual_pb2" filled label="PB" />
        <v-btn width="100%">Update Player 2</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import type { Matchinfo } from "@layouts/types/schemas";
import { storeModule }  from './store';
// import { replicantNS } from '@layouts/browser_shared/replicant_store';

@Component
export default class extends Vue {
  // If you want to just read a replicant without assigning a getter anywhere, you can do this too.
  /* @replicantNS.State(
    (s) => s.reps.exampleReplicant,
  ) readonly exampleReplicant!: ExampleReplicant; */

  @Getter readonly matchInfo!: Matchinfo;

  segments = [
    "Trevor%",
    "Countryside",
    "Blitz Play",
    "Deep Inside",
    "Paleto Score",
    "Fresh Meat",
    "Bureau Raid",
    "The Third Way",
  ];

  segment = "Trevor%";
  stage = "";
  manual_pb1 = false;
  manual_pb2 = false;

  mounted() {
    this.segment = this.matchInfo.segment;
    if (this.matchInfo.stage) {
      this.stage = this.matchInfo.stage;
    }
  }

  updateMatchInfo(): void {
    storeModule.updateMatchInfo({segment: this.segment, stage: this.stage})
  }
}
</script>
