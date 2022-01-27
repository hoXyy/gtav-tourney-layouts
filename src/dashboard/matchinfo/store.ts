import {
  replicantModule,
  ReplicantModule,
  ReplicantTypes,
} from "@layouts/browser_shared/replicant_store";
import { Matchinfo } from "@layouts/types/schemas";
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

  @Action({ rawError: true })
  updateMatchInfo(val: Matchinfo): void {
    replicantModule.setReplicant<Matchinfo>({ name: "matchinfoRep", val });
  }
}

const store = new Store({
  strict: process.env.NODE_ENV !== "production",
  state: {},
  modules: { ReplicantModule, OurModule },
});
export default store;
export const storeModule = getModule(OurModule, store);
