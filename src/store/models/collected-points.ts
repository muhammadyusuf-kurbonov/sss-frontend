import { BaseModel } from "@/feathers-client";
import {
  AnyData,
  ModelInstanceOptions,
} from "feathers-vuex/dist/service-module/types";
import { Team } from "./team";
import { Event } from "./event";

export class CollectedPointsModel extends BaseModel {
  constructor(
    data: AnyData | undefined,
    options: ModelInstanceOptions | undefined
  ) {
    super(data, options);
    this._id = data?._id;
    this.team = data?.team;
    this.event = data?.event;
    this.points = data?.points;
    this.teamId = data?.teamId;
    this.eventId = data?.eventId;
  }

  static modelName = "CollectedPoints";

  _id: string;
  teamId: string;
  eventId: string;
  points: number;
  team?: Team;
  event?: Event;
}
