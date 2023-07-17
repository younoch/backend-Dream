import mongoose, { Model, Schema } from 'mongoose';

import type { IContactUs  } from ".";

const IContactUsSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
}, { versionKey: false });

const ContactUsModel: Model<IContactUs> = mongoose.model<IContactUs>("Contact us", IContactUsSchema);

export default ContactUsModel;