import { BaseModel } from "@/feathers-client";
import {
  AnyData,
  ModelInstanceOptions,
} from "feathers-vuex/dist/service-module/types";
import { User } from "./user";

export class Team extends BaseModel {
  constructor(
    data: AnyData | undefined,
    options: ModelInstanceOptions | undefined
  ) {
    super(data, options);
    this._id = data?._id;
    this.name = data?.name;
    this.score = data?.score;
    this.members = data?.members;
  }

  static modelName = "Team";

  _id: string;
  name: string;
  members: User[];
  score: number;
}
