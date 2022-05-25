<template>
    <v-app>
        <v-text-field
            filled
            :label="`${player1.name}'s Twitch nickname`"
            v-model="feed1"
        />
        <v-btn @click="updateFeed1">Update {{ player1.name }}'s feed</v-btn>
        <br />
        <v-text-field
            filled
            :label="`${player2.name}'s Twitch nickname`"
            v-model="feed2"
        />
        <v-btn @click="updateFeed2">Update {{ player2.name }}'s feed</v-btn>
    </v-app>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import type { Player1, Player2 } from '@layouts/types/schemas';
    import { Getter } from 'vuex-class';

    @Component
    export default class extends Vue {
        @Getter readonly player1!: Player1;
        @Getter readonly player2!: Player2;

        feed1: string = '';
        feed2: string = '';

        async updateFeed1(): Promise<void> {
            try {
                await nodecg.sendMessage('updatePlayer1Feed', this.feed1);
            } catch (err) {
                // error
            }
        }

        async updateFeed2(): Promise<void> {
            try {
                await nodecg.sendMessage('updatePlayer2Feed', this.feed2);
            } catch (err) {
                // error
            }
        }
    }
</script>
