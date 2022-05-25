<template>
    <v-app>
        <div id="segments">
            <template v-for="segment in segments">
                <div :key="segment">
                    <span>{{ segment }}</span
                    >&nbsp;
                    <template v-if="!hasSegmentBeenBannedOrPicked(segment)">
                        <v-btn @click="pickSegment(segment)">Pick</v-btn>
                        <v-btn @click="banSegment(segment)">Ban</v-btn>
                    </template>
                    <template v-else>
                        <v-btn @click="undoPickBan(segment)"
                            >Undo Pick or Ban</v-btn
                        >
                    </template>
                </div>
            </template>
            <br />
            <v-btn @click="resetPickBans">Reset pick/bans</v-btn>
        </div>
    </v-app>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import type { Matchinfo } from '@layouts/types/schemas';
    import { storeModule } from './store';

    @Component
    export default class extends Vue {
        @Getter readonly matchInfo!: Matchinfo;
        @Getter readonly segmentPick!: string[];
        @Getter readonly segmentBan!: string[];

        segments = [
            'Trevor%',
            'Countryside',
            'Blitz Play',
            'Deep Inside',
            'Paleto Score',
            'Fresh Meat',
            'Bureau Raid',
            'The Third Way',
        ];

        hasSegmentBeenBannedOrPicked(segment: string): boolean {
            if (this.segmentPick.includes(segment)) {
                return true;
            } else if (this.segmentBan.includes(segment)) {
                return true;
            } else {
                return false;
            }
        }

        pickSegment(segment: string): void {
            storeModule.pickSegment(segment);
        }

        banSegment(segment: string): void {
            storeModule.banSegment(segment);
        }

        resetPickBans(): void {
            storeModule.resetPickBans();
        }

        undoPickBan(segment: string): void {
            if (this.segmentPick.includes(segment)) {
                storeModule.undoPick(segment);
            } else if (this.segmentBan.includes(segment)) {
                storeModule.undoBan(segment);
            }
        }
    }
</script>

<style>
    #segments {
        text-align: center;
    }
</style>
