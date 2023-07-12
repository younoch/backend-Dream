import mongoose, { Model, Schema } from 'mongoose';

import type { IQuote  } from "../models";

// Define the IComment schema
const ICommentSchema = new Schema({
    user_id: String,
    user_name: String,
    comment: String
});

// Define the IQuote schema
const IQuoteSchema = new Schema({
    quote: String,
    author: String,
    lang: String,
    slug: String,
    category_id: String,
    tags: [String],
    created_at: Date,
    updated_at: Date,
    comments: [ICommentSchema]
}, { versionKey: false });

const QuoteListModel: Model<IQuote> = mongoose.model<IQuote>("Quote", IQuoteSchema);

export default QuoteListModel;