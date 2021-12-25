import { BaseModel } from "@/feathers-client";
import {
  AnyData,
  ModelInstanceOptions,
} from "feathers-vuex/dist/service-module/types";
import { Team } from "./team";

export class User extends BaseModel {
  constructor(
    data: AnyData | undefined,
    options: ModelInstanceOptions | undefined
  ) {
    super(data, options);
    this._id = data?._id;
    this.fullName = data?.fullName;
    this.email = data?.email;
    this.teamId = data?.teamId;
    this.team = data?.team;
    this.avatarUrl = data?.avatarUrl;
  }

  static modelName = "User";

  _id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  teamId: string;
  team?: Team;
}
