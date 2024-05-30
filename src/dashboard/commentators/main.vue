<template>
    <div
        style="display: flex; gap: 5px; flex-direction: column"
        v-if="commentators"
    >
        <QInput filled label="Commentators" v-model="commentators.data" />
        <QBtn
            color="black"
            @click="updateCommentators"
            :disable="!commentators.changed"
            >Update commentators</QBtn
        >
    </div>
</template>

<script setup lang="ts">
    import type { Commentators } from '@layouts/types/schemas';
    import { useReplicant } from 'nodecg-vue-composable';

    const commentators = useReplicant<Commentators>(
        'commentators',
        'gtav-tourney-layouts'
    );

    function updateCommentators() {
        if (commentators) {
            commentators.save();
        }
    }
</script>
