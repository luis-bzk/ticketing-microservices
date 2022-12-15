import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// properties of user model
export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(userObj: IUser): IUserDoc;
}

// ----------------------

export interface IUserPayload {
  id: string;
  email: string;
}
