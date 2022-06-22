<template>
    <v-app>
        <v-container fluid class="text-center">
            <h1 style="font-size: 48px">{{ timer.time }}</h1>
        </v-container>
        <v-container fluid class="text-center">
            <h2>
                <span style="font-size: 12px">{{ player1.name }}</span>
                {{ score.player1 }} - {{ score.player2 }}
                <span style="font-size: 12px">{{ player2.name }}</span>
            </h2>
            <v-btn @click="increasePlayer1Score()">+</v-btn
            ><v-btn @click="decreasePlayer1Score()">-</v-btn>
            <v-btn @click="increasePlayer2Score()">+</v-btn
            ><v-btn @click="decreasePlayer2Score()">-</v-btn>
            <br />
            <v-btn @click="resetScore()">Reset Score</v-btn>
        </v-container>
        <v-container
            fluid
            class="d-flex text-center"
            style="justify-content: space-between"
        >
            <v-btn
                width="45%"
                @click="startTimer"
                :disabled="phase === 'finished'"
                >{{
                    phase === 'running' ? 'Pause Timer' : 'Start Timer'
                }}</v-btn
            >
            <v-btn
                width="45%"
                @click="resetTimer"
                :disabled="phase === 'stopped'"
                >Reset Timer</v-btn
            >
        </v-container>
        <div style="width: 100%; display: flex; flex-direction: column">
            <v-btn
                width="100%"
                @click="finishPlayer1"
                :disabled="
                    phase === 'stopped' ||
                    phase === 'finished' ||
                    player1.finishTime != undefined
                "
                class="my-2"
                >Finish Player 1
                <template v-if="player1.name"
                    >({{ player1.name }})</template
                ></v-btn
            >
            <v-btn
                width="100%"
                @click="finishPlayer2"
                :disabled="
                    phase === 'stopped' ||
                    phase === 'finished' ||
                    player2.finishTime != undefined
                "
                >Finish Player 2
                <template v-if="player2.name"
                    >({{ player2.name }})</template
                ></v-btn
            >
        </div>
    </v-app>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import type {
        Timer,
        Player1,
        Player2,
        Score,
    } from '@layouts/types/schemas';
    import { Getter } from 'vuex-class';
    import { storeModule } from './store';

    @Component
    export default class extends Vue {
        @Getter readonly timer!: Timer; // from store.ts
        @Getter readonly player1!: Player1;
        @Getter readonly player2!: Player2;
        @Getter readonly score!: Score;

        get phase() {
            return this.timer.phase;
        }

        async startTimer(): Promise<void> {
            try {
                if (this.phase === 'stopped' || this.phase === 'paused') {
                    await nodecg.sendMessage('timerStart');
                } else if (this.phase === 'running') {
                    await nodecg.sendMessage('timerPause');
                }
            } catch (err) {
                // catch
            }
        }

        async resetTimer(): Promise<void> {
            try {
                await nodecg.sendMessage('timerReset', true);
            } catch (err) {
                // error
            }
        }

        async finishPlayer1(): Promise<void> {
            try {
                await nodecg.sendMessage('finishPlayer1');
            } catch (err) {
                // err
            }
        }

        async finishPlayer2(): Promise<void> {
            try {
                await nodecg.sendMessage('finishPlayer2');
            } catch (err) {
                // err
            }
        }

        increasePlayer1Score(): void {
            storeModule.increasePlayer1Score();
        }
        increasePlayer2Score(): void {
            storeModule.increasePlayer2Score();
        }

        decreasePlayer1Score(): void {
            storeModule.decreasePlayer1Score();
        }
        decreasePlayer2Score(): void {
            storeModule.decreasePlayer2Score();
        }

        resetScore(): void {
            storeModule.resetScore();
        }
    }
</script>
