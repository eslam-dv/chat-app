import { model, Schema } from "mongoose";

import { compareValue, hashValue } from "../utils/bcrypt";

export interface IUser {
  id?: any;
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  comparePassword: (candidate: string) => boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minLength: [6, "password must atleast 6 characters long"],
    },
    profilePic: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform(_, ret) {
    ret.id = ret._id;
    (ret._id as any) = undefined;
    (ret.password as any) = undefined;
    (ret.__v as any) = undefined;

    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (candidatePass: string) {
  const isMatch = await compareValue(candidatePass, this.password);
  return isMatch;
};

const UserModel = model<IUser>("user", userSchema);

export default UserModel;
