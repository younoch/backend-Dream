import { Request, Response } from "express";
import QuoteListModel from "../models/QuoteListModel";
import TagController from "./TagController";
import type { IQuote } from "../models";

const QuoteListControaller: any = {};

QuoteListControaller.addQuote = (req: Request, res: Response) => {
  let reqBody : IQuote = req.body;
  const PostBody: IQuote = {
    quote: reqBody.quote,
    author: reqBody.author,
    lang: reqBody.lang,
    category_id: reqBody.category_id,
    slug: reqBody.quote.replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    tags: reqBody.tags,
    comments: reqBody.comments,
  };

  QuoteListModel.create(PostBody, (err: any, data: any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      TagController.updateTags(PostBody.tags);
      res.status(200).json({ status: "success", data: data });
    }
  });
};

QuoteListControaller.getQuotes = (req: Request, res: Response) => {
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 10;
  let offset = (page - 1) * limit;
  let total = 0;

  QuoteListModel.find({})
    .skip(offset)
    .limit(limit)
    .sort({ created_at: -1 })
    .exec((err: any, data: IQuote[]) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        QuoteListModel.countDocuments({}, (err: any, count: number) => {
          if (err) {
            res.status(400).json({ status: "fail", data: err });
          } else {
            total = count;
            let pages = Math.ceil(total / limit);
            res.status(200).json({
              status: "success",
              data: data,
              pagination: {
                page: page,
                limit: limit,
                pages: pages,
                total: total,
              },
              meta: {
                message: `Showing ${data.length} of ${total} quotes`,
              },
            });
          }
        });
      }
    });
};

QuoteListControaller.getSingleQuote = (req: Request, res: Response) => {
  let id = req.params.id;
  QuoteListModel.findById(id) 
    .populate("comments.profile") 
    .exec((err: any, data: IQuote | null) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err }); 
      } else {
        if (data) {
          res.status(200).json({ status: "success", data: data }); 
        } else {
          res.status(404).json({ status: "fail", data: "Quote not found" });
        }
      }
    });
};

QuoteListControaller.updateQuote = (req: Request, res: Response) => {
  let _id = req.query._id as string;
  let updateBody = req.body;
  updateBody.updated_at = new Date(Date.now());
  if(updateBody.quote) {
    updateBody.slug = updateBody.quote.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  }

  QuoteListModel.findByIdAndUpdate(
    _id,
    updateBody,
    { new: true },
    (err: any, data: IQuote | null) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

QuoteListControaller.getTags = (req: Request, res: Response) => {
  QuoteListModel.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).exec((err: any, data: any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

QuoteListControaller.deleteQuote = (req: Request, res: Response) => {
  let _id = req.query._id as string; 
  QuoteListModel.findByIdAndDelete(_id, (err: any, data: IQuote | null) => { 
    if (err) {
      res.status(400).json({ status: "fail", data: err }); 
    } else {
      if (data) {
        res.status(200).json({ status: "successfully deleted" }); 
      } else {
        res.status(404).json({ status: "fail", data: "Quote not found" });
      }
    }
  });
};

QuoteListControaller.searchQuotes = (req: Request, res: Response) => {
  let query = req.query.q as string;
  if (!query) {
    res.status(400).json({ status: "fail", data: "Missing query parameter" });
    return;
  }
  let regex = new RegExp(query, "i");
  QuoteListModel.aggregate([
    { $match: { $or: [{ quote: regex }, { author: regex }] } },
    {
      $addFields: {
        matches: {
          $sum: [
            {
              $cond: [{ $regexMatch: { input: "$quote", regex: regex } }, 1, 0],
            },
            {
              $cond: [
                { $regexMatch: { input: "$author", regex: regex } },
                1,
                0,
              ],
            },
          ],
        },
      },
    },
    { $sort: { matches: -1 } },
  ]).exec((err: any, data: any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

QuoteListControaller.getQuotesByCategory = (req: Request, res: Response) => {
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 10;
  let offset = (page - 1) * limit;
  let total = 0;
  let category_id = req.params.category_id; // get the category_id from the request

  QuoteListModel.find({category_id: category_id}) // find quotes that match the category_id
    .skip(offset)
    .limit(limit)
    .sort({ created_at: -1 })
    .exec((err: any, data: IQuote[]) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        QuoteListModel.countDocuments({category_id: category_id}, (err: any, count: number) => {
          if (err) {
            res.status(400).json({ status: "fail", data: err });
          } else {
            total = count;
            let pages = Math.ceil(total / limit);
            res.status(200).json({
              status: "success",
              data: data,
              pagination: {
                page: page,
                limit: limit,
                pages: pages,
                total: total,
              },
              meta: {
                message: `Showing ${data.length} of ${total} quotes in category ${category_id}`,
              },
            });
          }
        });
      }
    });
};

QuoteListControaller.getQuotesByTag = (req: Request, res: Response) => {
  let tag = req.query.tag as string;
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 10;
  let offset = (page - 1) * limit;
  let total = 0;

  QuoteListModel.find({ tags: tag })
    .skip(offset)
    .limit(limit)
    .sort({ created_at: -1 })
    .exec((err: any, data: IQuote[]) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        QuoteListModel.countDocuments({ tags: tag }, (err: any, count: number) => {
          if (err) {
            res.status(400).json({ status: "fail", data: err });
          } else {
            total = count;
            let pages = Math.ceil(total / limit);
            res.status(200).json({
              status: "success",
              data: data,
              pagination: {
                page: page,
                limit: limit,
                pages: pages,
                total: total,
              },
              meta: {
                message: `Showing ${data.length} of ${total} quotes with tag "${tag}"`,
              },
            });
          }
        });
      }
    });
};



export default QuoteListControaller;
