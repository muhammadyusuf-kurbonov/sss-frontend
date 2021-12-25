import Vue from "vue";
import Vuex from "vuex";
import feathersClient, {
  makeServicePlugin as service,
  FeathersVuex,
} from "../feathers-client";
import { CollectedPointsModel } from "./models/collected-points";
import { Event } from "./models/event";
import { Team } from "./models/team";
import { User } from "./models/user";

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    service({
      Model: User,
      service: feathersClient.service("users"),
    }),
    service({
      Model: Team,
      service: feathersClient.service("teams"),
    }),
    service({
      Model: Event,
      service: feathersClient.service("events"),
    }),
    service({
      Model: CollectedPointsModel,
      service: feathersClient.service("collected-points"),
    }),
  ],
});
