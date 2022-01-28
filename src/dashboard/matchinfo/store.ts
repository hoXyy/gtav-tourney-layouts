import {
  replicantModule,
  ReplicantModule,
  ReplicantTypes,
} from "@layouts/browser_shared/replicant_store";
import { Matchinfo, Player1, Player2, Manual } from "@layouts/types/schemas";
import clone from "clone";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { Action, getModule, Module, VuexModule } from "vuex-module-decorators";

Vue.use(Vuex);

@Module({ name: "OurModule" })
class OurModule extends VuexModule {
  // Helper getter to return all replicants.
  get reps(): ReplicantTypes {
    return this.context.rootState.ReplicantModule.reps;
  }

  get matchInfo(): Matchinfo {
    return this.reps.matchinfoRep;
  }

  get player1Rep(): Player1 {
    return this.reps.player1Rep;
  }

  get player2Rep(): Player2 {
    return this.reps.player2Rep;
  }

  get manualPbRep(): Manual {
    return this.reps.manualPbRep;
  }

  @Action({ rawError: true })
  updateMatchInfo(val: Matchinfo): void {
    replicantModule.setReplicant<Matchinfo>({ name: "matchinfoRep", val });
  }

  @Action({ rawError: true })
  updateManualPb(val: Manual): void {
    replicantModule.setReplicant<Manual>({ name: "manualPbRep", val });
  }

  @Action({ rawError: true })
  updatePlayer1(val: Player1): void {
    replicantModule.setReplicant<Player1>({ name: "player1Rep", val });
  }

  @Action({ rawError: true })
  updatePlayer2(val: Player2): void {
    replicantModule.setReplicant<Player2>({ name: "player2Rep", val });
  }
}

const store = new Store({
  strict: process.env.NODE_ENV !== "production",
  state: {},
  modules: { ReplicantModule, OurModule },
});
export default store;
export const storeModule = getModule(OurModule, store);
