<template>
  <div>
    <b-btn @click="$bvModal.show('modal-mark-' + teamId + event._id)">
      {{ point }}
    </b-btn>
    <b-modal
      :id="'modal-mark-' + teamId + event._id"
      @ok="saveScore"
      @show="onShow"
    >
      <b-form-input
        v-model="newPoints"
        type="range"
        min="0"
        :max="event.maxScore"
      ></b-form-input>
      <br />
      <span class="m-2">Mark: {{ newPoints }}</span>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { CollectedPointsModel } from "@/store/models/collected-points";
import { Event } from "@/store/models/event";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
@Component({
  methods: {
    ...mapActions("collected-points", ["patch", "find", "create"]),
  },
  computed: {
    ...mapGetters("collected-points", { getPoint: "find" }),
  },
})
export default class Point extends Vue {
  @Prop({ required: true }) teamId!: string;
  @Prop({ required: true }) event!: Event;

  private patch: any;
  private find: any;
  private create: any;

  private getPoint: any;

  private newPoints = 0;

  private pointsData: CollectedPointsModel | undefined;

  get point(): number {
    const point = this.getPoint({
      query: {
        teamId: this.teamId,
        eventId: this.event._id,
      },
    });

    console.log("points of", this.teamId, "are", point);

    this.pointsData = point.data[0] ? point.data[0] : undefined;

    return point.data[0] ? point.data[0].points : "0";
  }

  mounted(): void {
    this.find({
      query: {
        teamId: this.teamId,
        eventId: this.event._id,
      },
      paginate: false,
    });
  }

  onShow(): void {
    this.newPoints = this.point;
  }

  async saveScore(): Promise<void> {
    if (this.pointsData) {
      this.pointsData.points = this.newPoints;
      await this.pointsData.save();
    } else
      await this.create({
        teamId: this.teamId,
        eventId: this.event._id,
        points: this.newPoints,
      });

    this.$root.$emit("on.reload.request");
  }
}
</script>
