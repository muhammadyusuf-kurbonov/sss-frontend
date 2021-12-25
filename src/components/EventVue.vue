<template>
  <div>
    <span>{{ event }}</span>
  </div>
</template>
<script lang="ts">
import { Event } from "@/store/models/event";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
export default class EventVue extends Vue {
  @Prop({ required: true }) event!: Event;
}
</script>
