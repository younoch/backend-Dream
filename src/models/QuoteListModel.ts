import mongoose, { Model, Schema } from 'mongoose';

import type { IQuote  } from "../models";

const ICommentSchema = new Schema({
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    comment: String
});

const IQuoteSchema = new Schema({
    quote: String,
    author: String,
    lang: String,
    slug: { type: String, unique: true },
    category_id: String,
    image: String,
    tags: [String],
    created_at: Date,
    updated_at: Date,
    comments: [ICommentSchema]
}, { versionKey: false });

const QuoteListModel: Model<IQuote> = mongoose.model<IQuote>("Quote", IQuoteSchema);

export default QuoteListModel;