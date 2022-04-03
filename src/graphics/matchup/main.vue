<template>
    <div>
        <img id="background" src="./img/matchup.png" />
        <div class="player" id="player1" v-if="player1">
            <p
                id="player1-name"
                :style="{ fontFamily: 'Myriad Pro Bold', fontSize: '95px' }"
                v-if="player1.name"
            >
                {{ player1.name }}
            </p>
            <p id="player1-pb" :style="{ fontSize: '48px' }" v-if="player1.pb">
                {{ player1.pb }}
            </p>
        </div>
        <div class="player" id="player2" v-if="player2">
            <p
                id="player2-name"
                :style="{ fontFamily: 'Myriad Pro Bold', fontSize: '95px' }"
                v-if="player2.name"
            >
                {{ player2.name }}
            </p>
            <p id="player2-pb" :style="{ fontSize: '48px' }" v-if="player2.pb">
                {{ player2.pb }}
            </p>
        </div>
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
    import { Vue, Component } from 'vue-property-decorator';
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

        fit(): void {
            [this.fittyName1] = fitty('#player1-name', {
                minSize: 1,
                maxSize: 95,
            });
            [this.fittyName2] = fitty('#player1-name', {
                minSize: 1,
                maxSize: 95,
            });
            [this.fittyStage] = fitty('#tourney-stage-name', {
                minSize: 1,
                maxSize: 60,
            });
        }

        mounted() {
            this.fit();
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
