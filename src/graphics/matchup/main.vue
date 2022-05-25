<template>
    <div>
        <img id="background" src="./img/matchup.png" />
        <transition name="fade" mode="out-in">
            <div class="player" id="player1" v-if="player1" :key="player1.name">
                <div
                    id="avatar"
                    :style="{
                        width: '292px',
                        height: '292px',
                        position: 'absolute',
                        left: '278px',
                        bottom: '190px',
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
                            objectFit: 'cover',
                        }"
                    />
                </div>
                <p
                    id="player1-name"
                    :style="{ fontFamily: 'Myriad Pro Bold', fontSize: '95px' }"
                    v-if="player1.name"
                    :key="player1.name"
                >
                    {{ player1.name }}
                </p>
                <p id="player1-pb" :style="{ fontSize: '48px' }">
                    PB: {{ player1.pb || '--:--' }}
                </p>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div class="player" id="player2" v-if="player2" :key="player2.name">
                <div
                    id="avatar"
                    :style="{
                        width: '291px',
                        height: '292px',
                        position: 'absolute',
                        right: '278px',
                        bottom: '190px',
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
                            objectFit: 'cover',
                        }"
                    />
                </div>

                <p
                    id="player2-name"
                    :style="{ fontFamily: 'Myriad Pro Bold', fontSize: '95px' }"
                    v-if="player2.name"
                    :key="player2.name"
                >
                    {{ player2.name }}
                </p>
                <p id="player2-pb" :style="{ fontSize: '48px' }">
                    PB: {{ player2.pb || '--:--' }}
                </p>
            </div>
        </transition>
        <div id="on-deck">
            <p :style="{ fontSize: '52px' }">Commentators</p>
            <p>{{ commentators }}</p>
        </div>
        <div id="tourney-stage">
            <p id="tourney-stage-name">
                <b>{{ matchInfo.stage }}</b>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    // import { replicantNS } from '@layouts/browser_shared/replicant_store';
    import { storeModule } from './store';
    import type {
        Matchinfo,
        Commentators,
        Player1,
        Player2,
    } from '@layouts/types/schemas';
    import fitty, { FittyInstance } from 'fitty';

    @Component
    export default class extends Vue {
        @Getter readonly matchInfo!: Matchinfo; // from store.ts
        @Getter readonly commentators!: Commentators;
        @Getter readonly player1!: Player1;
        @Getter readonly player2!: Player2;

        fittyName1: FittyInstance | undefined;
        fittyName2: FittyInstance | undefined;
        fittyStage: FittyInstance | undefined;

        fitPlayer1(): void {
            [this.fittyName1] = fitty('#player1-name', {
                minSize: 1,
                maxSize: 95,
            });
        }

        fitPlayer2(): void {
            [this.fittyName2] = fitty('#player2-name', {
                minSize: 1,
                maxSize: 95,
            });
        }

        fitStage(): void {
            [this.fittyStage] = fitty('#tourney-stage-name', {
                minSize: 1,
                maxSize: 60,
            });
        }

        mounted() {
            setTimeout(() => {
                this.fitPlayer1();
                this.fitPlayer2();
                this.fitStage();
            }, 500);
        }

        @Watch('player1')
        onPlayer1Change() {
            setTimeout(() => {
                this.fitPlayer1();
            }, 500);
        }

        @Watch('player2')
        onPlayer2Change() {
            setTimeout(() => {
                this.fitPlayer2();
            }, 500);
        }

        @Watch('matchInfo')
        onInfoChange() {
            setTimeout(() => {
                this.fitStage();
            }, 500);
        }
    }
</script>

<style scoped>
    @import url('../css/base.css');

    #on-deck {
        font-family: 'signpainter_housescriptRg';
        color: white;
        position: absolute;
        bottom: 5px;
        left: 45px;
        font-size: 72px;
        line-height: 1px;
    }

    .player {
        color: white;
        display: flex;
        flex-direction: column;
        position: absolute;
        /*   background-color: rgba(255, 255, 255, 0.5); */
        text-align: center;
        width: 45%;
        line-height: 0px;
    }

    .player > p {
        margin: 45px;
    }

    #player1 {
        bottom: 259px;
        left: 50px;
    }

    #player2 {
        bottom: 259px;
        right: 50px;
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
</style>
