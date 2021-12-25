<template>
  <div>
    <b-btn @click="removeTeam" class="danger" variant="outline-danger">
      <b-icon icon="trash"></b-icon>
    </b-btn>
  </div>
</template>
<script lang="ts">
import { Team } from "@/store/models/team";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  name: "team-actions",
  methods: {
    ...mapActions("teams", ["patch", "remove"]),
  },
})
export default class TeamActions extends Vue {
  @Prop({ required: true }) team!: Team;
  private patch!: () => Promise<void>;
  private remove!: (id: string) => Promise<void>;

  removeTeam(): void {
    this.remove(this.team._id);
  }
}
</script>
