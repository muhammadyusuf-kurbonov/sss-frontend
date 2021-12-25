<template>
  <div>
    <span>{{ team.name }}</span>
  </div>
</template>
<script lang="ts">
import { Team } from "@/store/models/team";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
export default class TeamVue extends Vue {
  @Prop({ required: true }) team!: Team;
}
</script>
