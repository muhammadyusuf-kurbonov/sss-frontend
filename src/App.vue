<template>
  <div id="app" class="container">
    <b-btn @click="addNewUser">Add Team</b-btn>
    <b-btn @click="addNewEvent">Add Event</b-btn>
    <vue-quintable :config="config" :rows="tableRows"></vue-quintable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { User } from "./store/models/user";
import VueQuintable from "./components/QuinTable.vue";
import TeamVue from "./components/TeamVue.vue";
import EventVue from "./components/EventVue.vue";
import { Event } from "./store/models/event";
import { Team } from "./store/models/team";
import TeamActions from "./components/TeamActions.vue";

Vue.component("team-actions", TeamActions);

@Component({
  components: {
    VueQuintable,
    TeamVue,
    EventVue,
    "team-actions": TeamActions,
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

  async addNewUser(): Promise<void> {
    await this.addUser({
      fullName: "test",
      email: "test@domain.com",
      teamId: "test-team",
    });
    await this.fetchTeams({
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
        text: pointData ? pointData.points : "0",
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
