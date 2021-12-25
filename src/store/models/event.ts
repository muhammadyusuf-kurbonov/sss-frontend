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
    this._id = data?._id;
    this.title = data?.title;
    this.description = data?.description;
    this.maxScore = data?.maxScore;
  }

  static modelName = "Event";

  _id: string;
  title: string;
  description: string;
  maxScore: number;
}
