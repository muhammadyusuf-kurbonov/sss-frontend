<template>
  <div class="col-4">
    <b-btn v-b-modal.modal-add-member variant="primary" class="m-2"
      >Add new participant</b-btn
    >
    <b-modal
      id="modal-add-member"
      title="Add new participant"
      @ok="saveUser"
      @show="clear"
    >
      <b-container>
        <b-col>
          <b-form-input
            class="m-2"
            v-model="newUser.fullName"
            placeholder="Full name"
            required
          />
          <b-form-input
            class="m-2"
            v-model="newUser.email"
            type="email"
            placeholder="Email"
          />
          <b-form-input
            class="m-2"
            list="team-input"
            v-model="newUser.teamId"
            placeholder="Team"
          />
          <b-form-datalist
            id="team-input"
            :options="teams"
            html-field="name"
            value-field="_id"
          >
          </b-form-datalist>
        </b-col>
      </b-container>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Team } from "@/store/models/team";
import { User } from "@/store/models/user";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  methods: {
    ...mapActions("users", ["create"]),
    ...mapActions("teams", { fetchTeams: "find" }),
  },
  computed: {
    ...mapGetters("teams", { getTeams: "find" }),
  },
})
export default class AddNewParticipant extends Vue {
  private create!: (user: Partial<User>) => Promise<User>;
  private fetchTeams!: () => Promise<Team[]>;
  private getTeams!: any;

  get teams(): Team[] {
    return this.getTeams().data;
  }

  async saveUser(): Promise<void> {
    await this.create(this.newUser);
    this.$root.$emit("on.reload.request");
  }

  clear(): void {
    this.newUser = new User(undefined, undefined);
  }

  private newUser: User = new User(undefined, undefined);
}
</script>
