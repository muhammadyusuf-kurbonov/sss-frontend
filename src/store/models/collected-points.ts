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
  }

  static modelName = "CollectedPoints";

  id = "";
  teamId = "";
  eventId = "";
  points = 0;
  team?: Team;
  event?: Event;
}
