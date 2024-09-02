<template>
  <div style="display: flex; gap: 5px; flex-direction: column" v-if="hosts">
    <QInput outlined label="Hosts" v-model="hosts.data" />
    <QBtn color="black" @click="updateHosts" :disable="!hosts.changed"
      >Update Hosts</QBtn
    >
  </div>
</template>

<script setup lang="ts">
  import type { Commentators } from '@layouts/types/schemas';
  import { useReplicant } from 'nodecg-vue-composable';

  const hosts = useReplicant<Commentators>('hosts', 'gtav-tourney-layouts');

  function updateHosts() {
    if (hosts) {
      hosts.save();
    }
  }
</script>
