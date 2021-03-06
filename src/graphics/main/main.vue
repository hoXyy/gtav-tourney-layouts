<template>
    <div>
        <img id="background" src="./img/main.png" />
        <div id="on-deck">
            <commentators />
            <prize-pool />
        </div>
        <div class="player" id="player1">
            <div
                id="avatar"
                :style="{
                    width: '92px',
                    height: '92px',
                    position: 'absolute',
                    left: '-81px',
                    bottom: '11px',
                }"
            >
                <img
                    v-if="player1.hasAvatar"
                    :src="player1.avatar"
                    :style="{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }"
                />
                <img
                    v-else
                    src="../img/nopic.png"
                    :style="{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }"
                />
            </div>
            <p
                id="player1-name"
                style="font-family: Myriad Pro Bold; font-size: 72px"
            >
                {{ player1.name }}
            </p>
            <p id="player1-pb" style="font-size: 32px">
                PB: {{ player1.pb || '--:--' }}
                <template v-if="player1.finishTime">
                    | Finish Time: {{ player1.finishTime }}</template
                >
            </p>
        </div>
        <div class="player" id="player2">
            <div
                id="avatar"
                :style="{
                    width: '92px',
                    height: '92px',
                    position: 'absolute',
                    right: '-78px',
                    bottom: '11px',
                }"
            >
                <img
                    v-if="player2.hasAvatar"
                    :src="player2.avatar"
                    :style="{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }"
                />
                <img
                    v-else
                    src="../img/nopic.png"
                    :style="{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }"
                />
            </div>
            <p
                id="player2-name"
                style="font-family: Myriad Pro Bold; font-size: 72px"
            >
                {{ player2.name }}
            </p>
            <p id="player2-pb" style="font-size: 32px">
                <template v-if="player2.finishTime">
                    Finish Time: {{ player2.finishTime }} |
                </template>
                PB: {{ player2.pb || '--:--' }}
            </p>
        </div>
        <div id="timer">
            {{ timer.time }} <br />
            <p style="font-size: 72px">
                {{ score.player1 }} - {{ score.player2 }}
            </p>
        </div>
        <div id="tourney-stage">
            <p id="tourney-stage-name">
                <transition name="fade" mode="out-in">
                    <b :key="timestamp" v-if="textCycle === 0">{{
                        matchInfo.stage
                    }}</b>
                    <b :key="timestamp" v-if="textCycle === 1">{{
                        matchInfo.segment
                    }}</b>
                </transition>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import type {
        Timer,
        Matchinfo,
        Player1,
        Player2,
        Score,
    } from '@layouts/types/schemas';
    import fitty, { FittyInstance } from 'fitty';
    import Commentators from '../components/Commentators.vue';
    import PrizePool from '../components/PrizePool.vue';

    @Component({
        components: {
            Commentators,
            PrizePool,
        },
    })
    export default class extends Vue {
        @Getter readonly timer!: Timer;
        @Getter readonly matchInfo!: Matchinfo;
        @Getter readonly player1!: Player1;
        @Getter readonly player2!: Player2;
        @Getter readonly score!: Score;

        fittyName1: FittyInstance[] | undefined;
        fittyName2: FittyInstance[] | undefined;
        fittyStage: FittyInstance[] | undefined;

        textCycle: number = 0;
        timestamp = Date.now();

        fit(): void {
            this.fittyName1 = fitty('#player1-name', {
                minSize: 1,
                maxSize: 72,
            });
            this.fittyName2 = fitty('#player2-name', {
                minSize: 1,
                maxSize: 72,
            });
            this.fittyStage = fitty('#tourney-stage-name', {
                minSize: 1,
                maxSize: 60,
            });
        }

        mounted() {
            setTimeout(() => {
                this.fit();
            }, 500);

            setInterval(() => {
                this.timestamp = Date.now();
                if (!this.textCycle) {
                    this.textCycle = 1;
                } else {
                    this.textCycle = 0;
                }
            }, 30 * 1000);
        }

        @Watch('player1')
        onPlayer1Change(newVal: Player1) {
            if (newVal.finishTime && !this.player2.finishTime) {
                nodecg.playSound('timer-done', { updateVolume: true });
            }
            
            setTimeout(() => {
                this.fit();
            }, 500);
        }

        @Watch('player2')
        onPlayer2Change(newVal: Player2) {
            if (newVal.finishTime && !this.player1.finishTime) {
                nodecg.playSound('timer-done', { updateVolume: true });
            }

            setTimeout(() => {
                this.fit();
            }, 500);
        }

        @Watch('matchInfo')
        onInfoChange() {
            setTimeout(() => {
                this.fit();
            }, 500);
        }
    }
</script>

<style>
    @import url('../css/base.css');

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.7s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    #on-deck {
        font-family: 'signpainter_housescriptRg';
        color: white;
        position: absolute;
        bottom: 5px;
        left: 45px;
        font-size: 72px;
        line-height: 1px;
        width: calc(100% - 90px);
        display: flex;
        justify-content: space-between;
    }

    #background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    #tourney-stage {
        color: white;
        position: absolute;
        font-size: 60px;
        right: 40px;
        font-family: 'Trebuchet MS';
        width: 800px;
        text-align: center;
        height: 100px;
        top: 20px;
        line-height: 0px;
        text-transform: uppercase;
    }

    #timer {
        color: white;
        font-family: 'ChaletComprime-CologneSixty';
        font-size: 128px;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 110px;
        line-height: 15px;
    }

    .player {
        color: white;
        display: flex;
        flex-direction: column;
        position: absolute;
        /*   background-color: rgba(255, 255, 255, 0.5); */
        width: 38%;
        line-height: 0px;
    }
    #player1 {
        bottom: 209px;
        left: 120px;
    }

    .player > p {
        margin: 25px;
    }

    #player2 {
        bottom: 209px;
        right: 120px;
        text-align: right;
    }
</style>
