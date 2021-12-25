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
  }

  static modelName = "Team";

  _id = "";
  name = "";
  members: User[] = [];
  score = 0;
}
