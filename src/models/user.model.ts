import { model, Schema } from "mongoose";
import { IUser } from "../types/user.types";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    required: true,
    default: "USER",
  },
  subordinates: { type: [String], default: [] },
});

export const UserModel = model<IUser>("user", UserSchema);
