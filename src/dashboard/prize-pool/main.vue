<template>
    <div
        style="display: flex; gap: 5px; flex-direction: column"
        v-if="prizePool"
    >
        <QInput filled label="Prize Pool" v-model="prizePool.data" />
        <QBtn
            color="black"
            @click="updatePrizePool"
            :disable="!prizePool.changed"
            >Update prize pool</QBtn
        >
    </div>
</template>

<script setup lang="ts">
    import { useReplicant } from 'nodecg-vue-composable';

    const prizePool = useReplicant<number>('prizePool', 'gtav-tourney-layouts');

    function updatePrizePool() {
        if (prizePool) {
            prizePool.save();
        }
    }
</script>
