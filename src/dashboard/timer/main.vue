<template>
    <div v-if="timer && timer.data">
        <div style="width: 100%; text-align: center">
            <h1 style="font-size: 48px">
                <b>{{ timer.data.time }}</b>
            </h1>
        </div>
        <div
            style="display: flex; text-align: center; width: 100%"
            v-if="
                currentMatch &&
                currentMatch.data &&
                currentMatch.data.type != 'bo1' &&
                score &&
                score.data
            "
        >
            <h2>
                <span style="font-size: 12px">{{ player1Name }}</span>
                {{ score.data.player1 }} - {{ score.data.player2 }}
                <span style="font-size: 12px">{{ player2Name }}</span>
            </h2>
            <QBtn color="black" @click="increasePlayer1Score()">+</QBtn
            ><QBtn color="black" @click="decreasePlayer1Score()">-</QBtn>
            <QBtn color="black" @click="increasePlayer2Score()">+</QBtn
            ><QBtn color="black" @click="decreasePlayer2Score()">-</QBtn>
            <br />
            <QBtn color="black" @click="resetScore()">Reset Score</QBtn>
        </div>
        <div
            style="
                display: flex;
                text-align: center;
                justify-content: space-between;
                width: 100%;
            "
        >
            <QBtn
                width="45%"
                color="black"
                @click="startTimer"
                :disable="phase === 'finished'"
                >{{ phase === 'running' ? 'Pause Timer' : 'Start Timer' }}</QBtn
            >
            <QBtn
                width="45%"
                color="black"
                @click="resetTimer"
                :disable="phase === 'stopped'"
                >Reset Timer</QBtn
            >
        </div>
        <div
            style="width: 100%; display: flex; flex-direction: column"
            v-if="
                currentMatch &&
                currentMatch.data &&
                finishTimes &&
                finishTimes.data
            "
        >
            <QBtn
                width="100%"
                color="black"
                @click="finishPlayer1"
                :disabled="
                    phase === 'stopped' ||
                    phase === 'finished' ||
                    finishTimes.data.player1.length > 0
                "
                class="my-2"
                >Finish Player 1
                <template v-if="player1Name.length"
                    >({{ player1Name }})</template
                ></QBtn
            >
            <QBtn
                width="100%"
                color="black"
                @click="finishPlayer2"
                :disabled="
                    phase === 'stopped' ||
                    phase === 'finished' ||
                    finishTimes.data.player2.length > 0
                "
                >Finish Player 2
                <template v-if="player2Name.length"
                    >({{ player2Name }})</template
                ></QBtn
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Timer } from '@layouts/types/schemas';
    import { CurrentMatch, Score, FinishTimes } from '@layouts/types';
    import { useReplicant } from 'nodecg-vue-composable';
    import { $ref } from 'vue/macros';
    import { watch } from 'vue';

    const score = useReplicant<Score>('score', 'gtav-tourney-layouts');
    const currentMatch = useReplicant<CurrentMatch>(
        'currentMatch',
        'gtav-tourney-layouts'
    );
    const finishTimes = useReplicant<FinishTimes>(
        'finishTimes',
        'gtav-tourney-layouts'
    );
    const timer = useReplicant<Timer>('timer', 'gtav-tourney-layouts');

    let phase = $ref('');
    let player1Name = $ref('');
    let player2Name = $ref('');

    watch(
        () => timer?.data,
        (val) => {
            if (val) phase = val.phase;
        },
        { immediate: true }
    );

    watch(
        () => currentMatch?.data,
        (val) => {
            if (val) {
                player1Name = val.players.player1.name;
                player2Name = val.players.player2.name;
            }
        },
        { immediate: true }
    );

    async function startTimer() {
        try {
            if (phase === 'stopped' || phase === 'paused') {
                await nodecg.sendMessage('timerStart');
            } else if (phase === 'running') {
                await nodecg.sendMessage('timerPause');
            }
        } catch (err) {
            // catch
        }
    }

    async function resetTimer(): Promise<void> {
        try {
            await nodecg.sendMessage('timerReset', true);
        } catch (err) {
            // error
        }
    }

    async function finishPlayer1(): Promise<void> {
        try {
            await nodecg.sendMessage('finishPlayer1', true);
        } catch (err) {
            // error
        }
    }
    async function finishPlayer2(): Promise<void> {
        try {
            await nodecg.sendMessage('finishPlayer2', true);
        } catch (err) {
            // error
        }
    }

    function increasePlayer1Score() {
        if (score && score.data) {
            score.data.player1++;
            score.save();
        }
    }

    function increasePlayer2Score() {
        if (score && score.data) {
            score.data.player2++;
            score.save();
        }
    }

    function decreasePlayer1Score() {
        if (score && score.data) {
            score.data.player1--;
            score.save();
        }
    }

    function decreasePlayer2Score() {
        if (score && score.data) {
            score.data.player2--;
            score.save();
        }
    }

    function resetScore() {
        if (score && score.data) {
            score.data.player1 = 0;
            score.data.player2 = 0;
            score.save();
        }
    }
</script>
