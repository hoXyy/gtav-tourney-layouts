<template>
  <v-app>
    <v-text-field filled label="Commentators" v-model="commentators" />
    <v-btn @click="updateCommentators">Update commentators</v-btn>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import type { Commentators } from "@layouts/types/schemas";
import { Getter } from "vuex-class";
import { storeModule } from "./store";
// import { replicantNS } from '@layouts/browser_shared/replicant_store';

@Component
export default class extends Vue {
  @Getter readonly commlist!: Commentators; // from store.ts

  commentators = "";

  mounted() {
    this.commentators = this.commlist;
  }

  updateCommentators(): void {
    storeModule.updateCommentators(this.commentators);
  }
}
</script>
