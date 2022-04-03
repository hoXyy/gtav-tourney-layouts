import {
    replicantModule,
    ReplicantModule,
    ReplicantTypes,
} from '@layouts/browser_shared/replicant_store';
import clone from 'clone';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import {
    Matchinfo,
    Commentators,
    Timer,
    Player1,
} from '@layouts/types/schemas';

Vue.use(Vuex);

@Module({ name: 'OurModule' })
class OurModule extends VuexModule {
    // Helper getter to return all replicants.
    get reps(): ReplicantTypes {
        return this.context.rootState.ReplicantModule.reps;
    }

    get timer(): Timer {
        return this.reps.timerRep;
    }

    get matchInfo(): Matchinfo {
        return this.reps.matchinfoRep;
    }

    get commentators(): Commentators {
        return this.reps.commentatorsRep;
    }

    get player1(): Player1 {
        return this.reps.player1Rep;
    }

    get player2(): Player1 {
        return this.reps.player2Rep;
    }
}

const store = new Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    modules: { ReplicantModule, OurModule },
});
export default store;
export const storeModule = getModule(OurModule, store);
