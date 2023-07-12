import mongoose, { Model, Schema } from 'mongoose';

import type { ITag  } from ".";

const ITagSchema = new Schema({
    name: String,
    counts: Number
}, { versionKey: false });

const TagModel: Model<ITag> = mongoose.model<ITag>("Tag", ITagSchema);

export default TagModel;