<template>
  <div
    style="
      height: 90px;
      width: 100%;
      background-color: black;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: absolute;
      bottom: 71px;
      gap: 5px;
    "
    v-if="currentMatch && currentMatch.data">
    <div
      style="
        display: flex;
        flex-direction: row;
        gap: 15px;
        line-height: 102px;
        align-self: flex-start;
        margin-left: 5px;
        margin-right: 5px;
        flex: none;
      ">
      <span style="font-size: 105px"
        ><template v-if="currentMatch.data.type != 'showmatch'">{{
          currentMatch.data.type
        }}</template
        ><template v-else>SC</template></span
      >
    </div>
    <div
      style="line-height: 102px; max-width: 100%; flex: 1; overflow: hidden; white-space: nowrap">
      <SegmentBar
        id="segments"
        :segments="currentMatch.data.segments"
        :is-b-o1="currentMatch.data.type === 'bo1'"
        :player1="currentMatch.data.players.player1.name"
        :player2="currentMatch.data.players.player2.name" />
    </div>

    <div
      style="
        display: flex;
        flex-direction: row;
        gap: 5px;
        line-height: 78px;
        align-self: flex-end;
        margin-left: 5px;
        margin-right: 5px;
        white-space: nowrap;
        flex-shrink: 0;
        flex: none;
      ">
      <span ref="stage" style="font-size: 105px">{{ currentMatch.data.stage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { CurrentMatch, CurrentSegment } from '@layouts/types';
  import SegmentBar from './MatchInfo/SegmentBar.vue';
  import { $ref } from 'vue/macros';

  const stage = $ref<HTMLSpanElement | null>(null);

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');

  function isSegmentDone(segment: CurrentSegment) {
    const currentSegmentIndex = currentMatch;
  }
</script>
