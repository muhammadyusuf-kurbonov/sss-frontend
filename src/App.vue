<template>
  <div id="app" class="container">
    <span class="row m-5 no-gutter">
      <h3>Score system</h3>
      <i>by Shakhzod Khusanov</i>
    </span>
    <b-row>
      <div class="col-2"></div>
      <add-new-participant />
      <add-event-modal />
      <div class="col-2"></div>
    </b-row>
    <vue-quintable :config="config" :rows="tableRows"></vue-quintable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { User } from "./store/models/user";
import VueQuintable from "./components/QuinTable.vue";
import { Event } from "./store/models/event";
import { Team } from "./store/models/team";
import TeamActions from "./components/TeamActions.vue";
import AddNewParticipant from "./components/modals/AddParticipantModal.vue";
import AddEventModal from "./components/modals/AddEventModal.vue";
import PointVue from "./components/Points.vue";

Vue.component("team-actions", TeamActions);
Vue.component("point-vue", PointVue);

@Component({
  components: {
    VueQuintable,
    "team-actions": TeamActions,
    AddNewParticipant,
    AddEventModal,
  },
  methods: {
    ...mapActions("users", { fetchUsers: "find", addUser: "create" }),
    ...mapActions("teams", { fetchTeams: "find", addTeam: "create" }),
    ...mapActions("event", { fetchEvents: "find", addEvent: "create" }),
    ...mapActions("collected-points", {
      fetchCollectedPoints: "find",
      addCollectedPoint: "create",
    }),
  },
  computed: {
    ...mapGetters("users", { getUsers: "find" }),
    ...mapGetters("teams", { getTeams: "find" }),
    ...mapGetters("event", { getEvents: "find" }),
    ...mapGetters("collected-points", { getCollectedPoints: "find" }),
  },
})
export default class App extends Vue {
  private fetchUsers!: (params: any) => Promise<User[]>;
  private fetchTeams!: (params: any) => Promise<any>;
  private fetchEvents!: (params: any) => Promise<any>;
  private fetchCollectedPoints!: (params: any) => Promise<any>;

  private getUsers!: any;
  private addUser!: any;

  private getTeams!: any;
  private addTeam!: any;

  private getEvents!: any;
  private addEvent!: any;

  private getCollectedPoints!: any;
  private addCollectedPoint!: any;

  mounted(): void {
    this.$root.$on("on.reload.request", () => {
      this.fetchCollectedPoints({
        paginate: false,
      });
      this.fetchUsers({
        paginate: false,
      });
      this.fetchTeams({
        paginate: false,
      });

      this.fetchEvents({
        paginate: false,
      });
    });

    this.fetchUsers({
      paginate: false,
    });
    this.fetchTeams({
      paginate: false,
    });
    this.fetchEvents({
      paginate: false,
    });
    this.fetchCollectedPoints({
      paginate: false,
    });
  }

  async addNewEvent(): Promise<void> {
    await this.addEvent({
      title: "test-team",
      description: "test-team",
      maxScore: 100,
    });
  }

  get config() {
    return {
      columns: this.columns,
      pagination: true,
    };
  }

  get columns() {
    const columns = [];
    columns.push({
      headline: "Team",
    });

    this.getEvents({
      paginate: false,
    }).data.forEach((event: Event) => {
      columns.push({
        headline: event.title,
      });
    });

    columns.push({
      headline: "Total",
    });

    columns.push({
      headline: "Actions",
    });

    return columns;
  }

  get tableRows() {
    const rows: any[] = [];
    this.getTeams().data.forEach((team: Team) => rows.push(this.getRow(team)));
    return rows;
  }

  getRow(team: Team) {
    const row: any[] = [
      {
        text: team.name,
      },
    ];

    this.getEvents().data.forEach((event: Event) => {
      const pointData = this.getCollectedPoints({
        where: {
          eventId: event.id,
          teamId: team.id,
        },
      }).data[0];
      row.push({
        component: {
          name: "point-vue",
          props: {
            teamId: team._id,
            event: event,
          }
        },
      });
    });

    row.push({
      text: team.score.toString(),
    });

    row.push({
      component: {
        name: "team-actions",
        props: {
          team,
        },
      },
    });

    return row;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
