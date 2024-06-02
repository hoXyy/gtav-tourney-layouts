<template>
  <div
    v-if="currentMatch && currentMatch.data && currentSegment"
    style="display: flex; flex-direction: column">
    <QRadio
      v-for="segment in currentMatch.data.segments"
      v-model="selectedSegment"
      :val="segment.name"
      :label="`${segment.name} (${segment.pickedBy})`" />
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch, CurrentSegment } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import { watch } from 'vue';
  import { $ref } from 'vue/macros';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');

  let selectedSegment = $ref('');

  watch(
    () => selectedSegment,
    (newVal) => {
      if (currentSegment && currentMatch && currentMatch.data) {
        const segment = currentMatch.data.segments.find((segment) => segment.name === newVal);
        if (segment) {
          currentSegment.data = segment;
          currentSegment.save();
        }
      }
    }
  );
</script>
