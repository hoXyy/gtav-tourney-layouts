import type {
    Timer,
    Matchinfo,
    Commentators,
    Manual,
    Player1,
    Player2,
    Score
} from '@layouts/types/schemas';
import clone from 'clone';
import type { ReplicantBrowser } from 'nodecg/types/browser';
import Vue from 'vue';
import type { Store } from 'vuex';
import { namespace } from 'vuex-class';
import {
    getModule,
    Module,
    Mutation,
    VuexModule,
} from 'vuex-module-decorators';

// Declaring replicants.
export const reps: {
    timerRep: ReplicantBrowser<Timer>;
    matchinfoRep: ReplicantBrowser<Matchinfo>;
    commentatorsRep: ReplicantBrowser<Commentators>;
    player1Rep: ReplicantBrowser<Player1>;
    player2Rep: ReplicantBrowser<Player2>;
    manualPbRep: ReplicantBrowser<Manual>;
    segmentPickRep: ReplicantBrowser<string[]>;
    segmentBanRep: ReplicantBrowser<string[]>;
    prizePool: ReplicantBrowser<number>;
    scoreRep: ReplicantBrowser<Score>;
    [k: string]: ReplicantBrowser<unknown>;
} = {
    timerRep: nodecg.Replicant('timer'),
    matchinfoRep: nodecg.Replicant('matchinfo'),
    commentatorsRep: nodecg.Replicant('commentators'),
    player1Rep: nodecg.Replicant('player1'),
    player2Rep: nodecg.Replicant('player2'),
    manualPbRep: nodecg.Replicant('manual'),
    segmentPickRep: nodecg.Replicant('segmentPick', { defaultValue: [] }),
    segmentBanRep: nodecg.Replicant('segmentBan', { defaultValue: [] }),
    prizePool: nodecg.Replicant('prizePool', { defaultValue: 0 }),
    scoreRep: nodecg.Replicant('score')
};

// All the replicant types.
export interface ReplicantTypes {
    timerRep: Timer;
    matchinfoRep: Matchinfo;
    commentatorsRep: Commentators;
    player1Rep: Player1;
    player2Rep: Player2;
    manualPbRep: Manual;
    segmentPickRep: string[];
    segmentBanRep: string[];
    prizePool: number;
    scoreRep: Score;
}

@Module({ name: 'ReplicantModule', namespaced: true })
export class ReplicantModule extends VuexModule {
    // Replicant values are stored here.
    reps: { [k: string]: unknown } = {};

    get repsTyped(): ReplicantTypes {
        return this.reps as unknown as ReplicantTypes;
    }

    // This sets the state object above when a replicant sends an update.
    @Mutation
    setState({ name, val }: { name: string; val: unknown }): void {
        Vue.set(this.reps, name, clone(val));
    }

    // This is a generic mutation to update a named replicant.
    @Mutation
    setReplicant<K>({ name, val }: { name: string; val: K }): void {
        Vue.set(this.reps, name, clone(val)); // Also update local copy, although no schema validation!
        reps[name].value = clone(val);
    }
}

// eslint-disable-next-line import/no-mutable-exports
export let replicantModule!: ReplicantModule;
export const replicantNS = namespace('ReplicantModule');

export async function setUpReplicants(store: Store<unknown>): Promise<void> {
    // Listens for each declared replicants "change" event, and updates the state.
    Object.keys(reps).forEach((name) => {
        reps[name].on('change', (val) => {
            store.commit('ReplicantModule/setState', { name, val });
        });
    });
    // We should make sure the replicant are ready to be read, needs to be done in browser context.
    await NodeCG.waitForReplicants(
        ...Object.keys(reps).map((key) => reps[key])
    );
    replicantModule = getModule(ReplicantModule, store);
}
