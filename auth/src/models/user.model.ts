import mongoose from "mongoose";
import { IUser, IUserModel, IUserDoc } from "../interfaces";
import { Password } from "../services";

// Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Additional methods

userSchema.pre("save", async function (done) {
  if (!this.isModified("password")) {
    done();
  }

  const hashed = await Password.toHash(this.get("password"));
  this.set("password", hashed);
});

userSchema.statics.build = (userObj: IUser) => {
  return new UserModel(userObj);
};

// Model
const UserModel = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { UserModel };
