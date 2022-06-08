<template>
    <div id="prize-pool" :style="{ textAlign: 'right' }">
        <p style="font-size: 52px">Prize Pool</p>
        <p style="font-size: 72px">${{ prizePool }}</p>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    @Component
    export default class PrizePool extends Vue {
        @Getter readonly prizePool!: number;
    }
</script>
