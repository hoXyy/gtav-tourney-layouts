<template>
    <div id="commentators">
        <p style="font-size: 52px">Commentators</p>
        <p>{{ commentators }}</p>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import type { Commentators as CommentatorsType } from '@layouts/types/schemas';

    @Component
    export default class Commentators extends Vue {
        @Getter readonly commentators!: CommentatorsType;
    }
</script>
