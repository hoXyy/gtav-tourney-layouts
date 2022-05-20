<template>
    <v-app>
        <div id="segments">
            <template v-for="segment in segments">
                <div :key="segment">
                    <span>{{ segment }}</span
                    >&nbsp;
                    <v-btn
                        @click="pickSegment(segment)"
                        :disabled="
                            segmentPick.includes(segment) ||
                            segmentBan.includes(segment)
                        "
                        >Pick</v-btn
                    >
                    <v-btn
                        @click="banSegment(segment)"
                        :disabled="
                            segmentBan.includes(segment) ||
                            segmentPick.includes(segment)
                        "
                        >Ban</v-btn
                    >
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

        pickSegment(segment: string): void {
            storeModule.pickSegment(segment);
        }

        banSegment(segment: string): void {
            storeModule.banSegment(segment);
        }

        resetPickBans(): void {
            storeModule.resetPickBans();
        }
    }
</script>

<style>
    #segments {
        text-align: center;
    }
</style>
