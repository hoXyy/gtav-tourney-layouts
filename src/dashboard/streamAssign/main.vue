<template>
  <div
    v-if="currentMatch && currentMatch.data"
    style="display: flex; flex-direction: column; gap: 5px">
    <QInput outlined :label="`${player1}'s Twitch nickname`" v-model="feed1" />
    <QBtn color="black" @click="updateFeed1">Update {{ player1 }}'s feed</QBtn>
    <br />
    <QInput outlined :label="`${player2}'s Twitch nickname`" v-model="feed2" />
    <QBtn color="black" @click="updateFeed2">Update {{ player2 }}'s feed</QBtn>
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import { watch } from 'vue';
  import { $ref } from 'vue/macros';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');

  let player1 = $ref<string>('');
  let player2 = $ref<string>('');

  let feed1 = $ref<string>('');
  let feed2 = $ref<string>('');

  watch(
    () => currentMatch?.data,
    (newVal) => {
      if (newVal) {
        player1 = newVal.players.player1.name || '';
        player2 = newVal.players.player2.name || '';
      }
    },
    {
      immediate: true,
    }
  );

  function updateFeed1() {
    nodecg.sendMessage('updatePlayer1Feed', feed1);
  }

  function updateFeed2() {
    nodecg.sendMessage('updatePlayer2Feed', feed2);
  }
</script>
