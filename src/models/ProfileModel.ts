import mongoose from "mongoose";

interface DataSchema {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  username: string;
  password: string;
}

const DataSchema = new mongoose.Schema<DataSchema>(
  {
    FirstName: { type: String , required: false},
    LastName: { type: String , required: false},
    EmailAddress: { type: String, required: false },
    username: { type: String, unique: true },
    password: { type: String },
  },
  { versionKey: false }
);

const ProfileModel = mongoose.model("Profile", DataSchema);

export default ProfileModel;
