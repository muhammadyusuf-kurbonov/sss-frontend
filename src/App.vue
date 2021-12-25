<template>
  <div id="app">
    <b-btn @click="addNewUser"></b-btn>
    <div>{{ users }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { User } from "./store/models/user";

@Component({
  components: {
  },
  methods: {
    ...mapActions("users", { getUsers: "find", addUser: "create" }),
  },
  computed: {
    ...mapGetters("users", ["find"]),
  },
})
export default class App extends Vue {
  private find!: any;
  private getUsers!: any;
  private addUser!: any;

  get users(): User[] {
    return this.find({
      paginate: false,
    });
  }
  mounted(): void {
    this.getUsers();
  }
  async addNewUser(): Promise<void> {
    await this.addUser({
      fullName: "test",
      email: "test@domain.com",
      teamId: "test-team",
    });
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
