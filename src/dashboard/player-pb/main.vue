<template>
  <div>
    <div
      v-if="playerPbs && playerPbs.data && manualPbs && manualPbs.data"
      style="display: flex; flex-direction: column">
      <div style="display: flex; flex-direction: column">
        <QCheckbox
          v-model="manualPbs.data.player1"
          @click="() => manualPbs?.save()"
          label="Update player 1 PB manually" />
        <QInput
          outlined
          v-model="playerPbs.data.player1"
          label="Player 1 PB"
          :disable="!manualPbs.data.player1" />
      </div>
      <div style="display: flex; flex-direction: column">
        <QCheckbox
          v-model="manualPbs.data.player2"
          @click="() => manualPbs?.save()"
          label="Update player 2 PB manually" />
        <QInput
          outlined
          v-model="playerPbs.data.player2"
          label="Player 2 PB"
          :disable="!manualPbs.data.player2" />
      </div>
      <QBtn color="black" @click="() => playerPbs?.save()" :disable="!playerPbs.changed"
        >Save changes</QBtn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ManualPb, PlayerPbs } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import { QBtn, QCheckbox } from 'quasar';

  const playerPbs = useReplicant<PlayerPbs>('playerPbs', 'gtav-tourney-layouts', {
    defaultValue: { player1: '', player2: '' },
  });
  const manualPbs = useReplicant<ManualPb>('manualPb', 'gtav-tourney-layouts', {
    defaultValue: { player1: false, player2: false },
  });
</script>
