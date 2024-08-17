<template>
  <div style="z-index: 3; position: absolute;">
    <p id="prize-pool" v-if="prizePool && prizePool.data">
      Prize Pool: ${{ formatAmount(prizePool.data) }}
    </p>
    <img style="z-index: 3" src="../img/topbar.png" />
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';

  const prizePool = useReplicant<number>('prizePool', 'gtav-tourney-layouts', { defaultValue: 0 });

  function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US').format(amount);
  }
</script>

<style scoped>
  #prize-pool {
    font-size: 50px;
    color: white;
    z-index: 3;
    position: fixed;
    right: 27px;
    top: -39px;
    text-align: right;
    font-family: "Bebas Neue";
  }
</style>
