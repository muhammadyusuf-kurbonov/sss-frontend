<template>
  <div class="col-4">
    <b-btn v-b-modal.modal-add-event variant="primary" class="m-2"
      >Add new event</b-btn
    >
    <b-modal
      id="modal-add-event"
      title="Add new event"
      @ok="saveEvent"
      @show="clear"
    >
      <b-container>
        <b-col>
          <b-form-input
            class="m-2"
            v-model="newEvent.title"
            placeholder="Title"
            required
          />
          <b-form-input
            class="m-2"
            v-model="newEvent.description"
            type="text"
            placeholder="Description"
            required
          />
          <b-form-input
            class="m-2"
            type="number"
            max="100"
            min="1"
            v-model="newEvent.maxScore"
            placeholder="Max points avaible"
            required
          />
        </b-col>
      </b-container>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Event } from "@/store/models/event";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  methods: {
    ...mapActions("event", ["create"]),
  },
})
export default class AddEventModal extends Vue {
  private create!: (user: Partial<Event>) => Promise<Event>;

  async saveEvent(): Promise<void> {
    await this.create(this.newEvent);
    this.$root.$emit("on.reload.request");
  }

  clear(): void {
    this.newEvent = new Event(undefined, undefined);
  }

  private newEvent: Event = new Event(undefined, undefined);
}
</script>
