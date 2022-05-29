<template>
    <div>
        <div id="backgrounds">
            <img class="bg" src="./img/selection.png" />

            <!-- ban images -->
            <img
                class="bg"
                v-if="segmentBan.includes('Trevor%')"
                src="./img/ban/trevor_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('Countryside')"
                src="./img/ban/cs_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('Blitz Play')"
                src="./img/ban/blitz_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('Deep Inside')"
                src="./img/ban/deep_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('Fresh Meat')"
                src="./img/ban/fresh_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('Paleto Score')"
                src="./img/ban/paleto_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('The Third Way')"
                src="./img/ban/thirdway_ban.png"
            />
            <img
                class="bg"
                v-if="segmentBan.includes('Bureau Raid')"
                src="./img/ban/bureau_ban.png"
            />

            <!-- pick images -->
            <img
                class="bg"
                v-if="segmentPick.includes('Trevor%')"
                src="./img/pick/trevor_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('Countryside')"
                src="./img/pick/cs_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('Blitz Play')"
                src="./img/pick/blitz_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('Deep Inside')"
                src="./img/pick/deep_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('Fresh Meat')"
                src="./img/pick/fresh_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('Paleto Score')"
                src="./img/pick/paleto_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('The Third Way')"
                src="./img/pick/thirdway_pick.png"
            />
            <img
                class="bg"
                v-if="segmentPick.includes('Bureau Raid')"
                src="./img/pick/bureau_pick.png"
            />

            <img class="bg" src="./img/selection_text.png" />
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
    import type { Matchinfo } from '@layouts/types/schemas';
    import fitty, { FittyInstance } from 'fitty';

    @Component
    export default class extends Vue {
        @Getter readonly matchInfo!: Matchinfo; // from store.ts
        @Getter readonly segmentPick!: string[];
        @Getter readonly segmentBan!: string[];

        fittyStage: FittyInstance | undefined;

        fit(): void {
            [this.fittyStage] = fitty('#tourney-stage-name', {
                minSize: 1,
                maxSize: 60,
            });
        }

        mounted() {
            this.fit();
        }

        @Watch('segmentPick')
        onSegmentPick(newVal: string[], oldVal: string[]): void {
            // only play if something actually got picked
            if (newVal.length > oldVal.length) {
                nodecg.playSound('segment-pick', { updateVolume: true });
            }
        }

        @Watch('segmentBan')
        onSegmentBan(newVal: string[], oldVal: string[]): void {
            // only play if something actually got banned
            if (newVal.length > oldVal.length) {
                nodecg.playSound('segment-ban', { updateVolume: true });
            }
        }
    }
</script>

<style scoped>
    @import url('../css/base.css');

    #backgrounds {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
    }

    #backgrounds .bg {
        position: absolute;
        top: 0;
        left: 0;
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
