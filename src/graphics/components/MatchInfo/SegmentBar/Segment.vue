<template>
  <template v-if="isBO1">
    <div
      :class="isCurrent ? 'current' : ''"
      style="
        font-size: 100px;
        margin-right: 15px;
        padding-left: 7px;
        padding-right: 7px;
        margin-top: 5px;
        height: 80px;
      ">
      <div style="margin-top: -5px">
        {{ isSegmentDone ? shortNames[segment.name as string] : segment.name }}
      </div>
    </div></template
  >
  <template v-else>
    <div
      style="
        margin-right: 15px;
        margin-top: 5px;
        height: 80px;
        display: flex;
        flex-direction: column;
        gap: 0px;
      ">
      <div
        :class="isCurrent ? 'current' : ''"
        style="line-height: 59px; font-size: 64px; height: 52px">
        {{ isSegmentDone ? shortNames[segment.name as string] : segment.name }}
      </div>
      <div :style="{ color: props.colourToUse }" style="margin-top: -33px; font-size: 30px">
        {{ isSegmentDone ? '■' : segment.pickedBy
        }}<template v-if="segment.pickedBy != 'Decider'">'s pick</template>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { $ref } from 'vue/macros';

  const props = defineProps(['segment', 'isCurrent', 'isSegmentDone', 'colourToUse', 'isBO1']);

  const shortNames = $ref<{ [key: string]: string }>({
    'The Third Way': 'TTW',
    'Deep Inside': 'DI',
    'Fresh Meat': 'FM',
    'Trevor%': 'T%',
    Countryside: 'CS',
    'Blitz Play': 'BP',
    'All Stunt Jumps': 'ASJ',
    'All Races': 'AR',
    'Epsilon Program': 'EP',
  });
</script>

<style scoped>
  .current {
    background-color: white;
    color: black;
    padding-left: 7px;
    padding-right: 7px;
  }
</style>
