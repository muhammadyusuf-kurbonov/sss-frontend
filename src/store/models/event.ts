import { BaseModel } from "@/feathers-client";
import {
  AnyData,
  ModelInstanceOptions,
} from "feathers-vuex/dist/service-module/types";

export class Event extends BaseModel {
  constructor(
    data: AnyData | undefined,
    options: ModelInstanceOptions | undefined
  ) {
    super(data, options);
  }

  static modelName = "Event";

  _id = "";
  title = "";
  description = "";
  maxScore = 0;
}
