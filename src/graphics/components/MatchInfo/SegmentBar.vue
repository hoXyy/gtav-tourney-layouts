<template>
  <div style="display: flex; flex-direction: row; gap: 5px">
    <Segment
      v-for="segment in segments"
      :segment="segment"
      :key="segment.name"
      :is-current="
        currentSegment && currentSegment.data && segment.name === currentSegment.data.name
      "
      :is-b-o1="isBO1"
      :is-segment-done="isSegmentDone(segment)"
      :colour-to-use="getPlayerColor(segment)" />
  </div>
</template>

<script setup lang="ts">
  import { CurrentSegment } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import Segment from './SegmentBar/Segment.vue';

  const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');

  const props = defineProps<{
    segments: CurrentSegment[];
    isBO1: boolean;
    player1: string;
    player2: string;
  }>();

  function isSegmentDone(segmentToCheck: CurrentSegment) {
    if (currentSegment && currentSegment.data != undefined) {
      const currentSegmentIndex = props.segments.findIndex(
        (segment) => currentSegment.data!.name === segment.name
      );
      if (currentSegmentIndex > -1) {
        const segmentIndex = props.segments.findIndex(
          (segment) => segment.name === segmentToCheck.name
        );
        if (segmentIndex < currentSegmentIndex) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function getPlayerColor(segment: CurrentSegment) {
    if (segment.pickedBy === props.player1) {
      return '#ffde1b';
    } else if (segment.pickedBy === props.player2) {
      return '#ff1b62';
    } else {
      return 'white';
    }
  }
</script>
