import mongoose from 'mongoose';

interface DataSchema {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  MobileNumber: string;
  City: string;
  UserName: string;
  Password: string;
}

const DataSchema = new mongoose.Schema<DataSchema>({

    FirstName: {type:String},
    LastName: {type:String},
    EmailAddress: {type:String},
    MobileNumber: {type:String},
    City: {type:String},
    UserName: {type:String, unique: true},
    Password: {type:String},
}, { versionKey: false })

const ProfileModel = mongoose.model("Profile", DataSchema)

export default ProfileModel;
