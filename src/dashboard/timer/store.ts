import {
    replicantModule,
    ReplicantModule,
    ReplicantTypes,
} from '@layouts/browser_shared/replicant_store';
import { Timer, Player1, Player2, Score } from '@layouts/types/schemas';
import clone from 'clone';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';

Vue.use(Vuex);

@Module({ name: 'OurModule' })
class OurModule extends VuexModule {
    // Helper getter to return all replicants.
    get reps(): ReplicantTypes {
        return this.context.rootState.ReplicantModule.reps;
    }

    // Helper getter to return a specific replicant.
    get timer(): Timer {
        return this.reps.timerRep;
    }

    get player1(): Player1 {
        return this.reps.player1Rep;
    }

    get player2(): Player2 {
        return this.reps.player2Rep;
    }

    get score(): Score {
        return this.reps.scoreRep;
    }

    @Action({ rawError: true })
    increasePlayer1Score() {
        let currentScore = clone(this.score);
        let newScore = {
            player1: ++currentScore.player1,
            player2: currentScore.player2,
        };

        replicantModule.setReplicant<Score>({
            name: 'scoreRep',
            val: newScore,
        });
    }
    @Action({ rawError: true })
    decreasePlayer1Score() {
        let currentScore = clone(this.score);
        let newScore = {
            player1: --currentScore.player1,
            player2: currentScore.player2,
        };

        replicantModule.setReplicant<Score>({
            name: 'scoreRep',
            val: newScore,
        });
    }
    @Action({ rawError: true })
    increasePlayer2Score() {
        let currentScore = clone(this.score);
        let newScore = {
            player1: currentScore.player1,
            player2: ++currentScore.player2,
        };

        replicantModule.setReplicant<Score>({
            name: 'scoreRep',
            val: newScore,
        });
    }
    @Action({ rawError: true })
    decreasePlayer2Score() {
        let currentScore = clone(this.score);
        let newScore = {
            player1: currentScore.player1,
            player2: --currentScore.player2,
        };

        replicantModule.setReplicant<Score>({
            name: 'scoreRep',
            val: newScore,
        });
    }

    @Action({ rawError: true })
    resetScore() {
        let score = { player1: 0, player2: 0 };

        replicantModule.setReplicant<Score>({
            name: 'scoreRep',
            val: score,
        });
    }
}

const store = new Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    modules: { ReplicantModule, OurModule },
});
export default store;
export const storeModule = getModule(OurModule, store);
