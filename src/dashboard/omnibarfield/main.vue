<template>
    <div style="display: flex; gap: 5px; flex-direction: column" v-if="omnibarfield">
      <QInput outlined label="Omnibar" v-model="omnibarfield.data" />
      <QBtn color="black" @click="updateOmniBarField" :disable="!omnibarfield.changed"
        >Update omnibar</QBtn
      >
    </div>
  </template>
  
<script setup lang="ts">
import Omnibar from '@layouts/graphics/components/Omnibar.vue';
import type { Omnibarfield } from '@layouts/types/schemas';
import { useReplicant } from 'nodecg-vue-composable';

const omnibarfield = useReplicant<Omnibarfield>('omnibarfield', 'gtav-tourney-layouts');

function updateOmniBarField() {
if (omnibarfield) {
    omnibarfield.save();
}
}
</script>
  