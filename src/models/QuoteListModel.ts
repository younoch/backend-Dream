import mongoose, { Document, Model, Schema } from 'mongoose';

interface IComment {
    user_id: string
    user_name: string
    comment: string
}

interface IQuote extends Document {
    quote: string
    lang: string
    slug: string
    category_id: string
    tags: string[]
    created_at: Date
    updated_at: Date
    comments: IComment[]
}

// Define the IComment schema
const ICommentSchema = new Schema({
    user_id: String,
    user_name: String,
    comment: String
});

// Define the IQuote schema
const IQuoteSchema = new Schema({
    quote: String,
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