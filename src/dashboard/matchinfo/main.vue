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
    <v-btn @click="updateMatchInfo" width="100%" class="my-5"
      >Update Match Info</v-btn
    >
    <div style="display: flex; flex-direction: row; width: 100%">
      <div id="player1" style="margin-right: 10px; width: 50%">
        <v-text-field v-model="player1name" filled label="Nickname" />
        <v-text-field v-model="player1src" filled label="Speedrun.com name" />
        <v-checkbox
          @change="updateManualPb"
          v-model="manual_pb1"
          label="Set PB manually"
        />
        <v-text-field
          v-model="player1pb"
          :disabled="!manual_pb1"
          filled
          label="PB"
        />
        <v-btn @click="updatePlayer1" width="100%">Update Player 1</v-btn>
      </div>
      <div
        id="divider"
        style="height: 100%; margin-right: 30px; margin-left: 6px"
      >
        <h2 style="margin: auto; position: absolute; top: 50%">vs</h2>
      </div>

      <div id="player2" style="margin-left: 10px; width: 50%">
        <v-text-field v-model="player2name" filled label="Nickname" />
        <v-text-field v-model="player2src" filled label="Speedrun.com name" />
        <v-checkbox
          @change="updateManualPb"
          v-model="manual_pb2"
          label="Set PB manually"
        />
        <v-text-field
          v-model="player2pb"
          :disabled="!manual_pb2"
          filled
          label="PB"
        />
        <v-btn @click="updatePlayer2" width="100%">Update Player 2</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import type {
  Matchinfo,
  Player1,
  Player2,
  Manual,
} from "@layouts/types/schemas";
import { storeModule } from "./store";
// import { replicantNS } from '@layouts/browser_shared/replicant_store';

@Component
export default class extends Vue {
  // If you want to just read a replicant without assigning a getter anywhere, you can do this too.
  /* @replicantNS.State(
    (s) => s.reps.exampleReplicant,
  ) readonly exampleReplicant!: ExampleReplicant; */

  @Getter readonly matchInfo!: Matchinfo;
  @Getter readonly manualPbRep!: Manual;
  @Getter readonly player1Rep!: Player1;
  @Getter readonly player2Rep!: Player2;

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

  player1name = "";
  player1src = "";
  player1pb = "";

  player2name = "";
  player2src = "";
  player2pb = "";

  mounted() {
    // main match info
    this.segment = this.matchInfo.segment;
    if (this.matchInfo.stage) {
      this.stage = this.matchInfo.stage;
    }
    // checkboxes
    this.manual_pb1 = this.manualPbRep.player1;
    this.manual_pb2 = this.manualPbRep.player2;

    //player info
    this.player1name = this.player1Rep.name;
    this.player1src = this.player1Rep.src;
    if (this.player1Rep.pb) {
      this.player1pb = this.player1Rep.pb;
    }

    this.player2name = this.player2Rep.name;
    this.player2src = this.player2Rep.src;
    if (this.player2Rep.pb) {
      this.player2pb = this.player2Rep.pb;
    }
  }

  updateMatchInfo(): void {
    storeModule.updateMatchInfo({ segment: this.segment, stage: this.stage });
  }

  updateManualPb(): void {
    storeModule.updateManualPb({
      player1: this.manual_pb1,
      player2: this.manual_pb2,
    });
  }

  updatePlayer1(): void {
    storeModule.updatePlayer1({
      name: this.player1name,
      src: this.player1src,
    });
  }

  updatePlayer2(): void {
    storeModule.updatePlayer2({
      name: this.player2name,
      src: this.player2src,
    });
  }

  @Watch("player1Rep")
  onPlayer1Change(value: Player1): void {
    this.player1name = value.name;
    this.player1src = value.src;
    if (value.pb) {
      this.player1pb = value.pb;
    }
  }

  @Watch("player2Rep")
  onPlayer2Change(value: Player2): void {
    this.player2name = value.name;
    this.player2src = value.src;
    if (value.pb) {
      this.player2pb = value.pb;
    }
  }
}
</script>
