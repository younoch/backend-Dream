interface IComment {
  user_id: string;
  user_name: string;
  comment: string;
}

export interface IQuote {
  quote: string;
  author: string;
  lang: string;
  slug: string;
  category_id: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  comments?: IComment[] | undefined;
}

interface ITag {
    name: string,
    counts: number,
}