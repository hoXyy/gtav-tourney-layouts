<template>
    <v-app>
        <v-text-field filled label="Prize Pool" v-model="prizePool" />
        <v-btn @click="updatePrizePool">Update prize pool</v-btn>
    </v-app>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import { storeModule } from './store';
    // import { replicantNS } from '@layouts/browser_shared/replicant_store';

    @Component
    export default class extends Vue {
        @Getter readonly prizePoolAmount!: number; // from store.ts

        prizePool = 0;

        mounted() {
            this.prizePool = this.prizePoolAmount;
        }

        updatePrizePool(): void {
            storeModule.updatePrizePool(this.prizePool);
        }
    }
</script>
