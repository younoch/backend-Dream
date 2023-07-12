import { Request, Response } from "express";
import TagModel from "../models/TagModel";

const TagController: any = {};

TagController.updateTags = async (tags: string[]) => {
  for (let tag of tags) {
    let tagDoc = await TagModel.findOne({ name: tag });
    if (tagDoc) {
       tagDoc.updateOne({ $inc: { counts: 1 } });
    } else {
    TagModel.create({ name: tag, counts: 1 });
    }
  }
};

TagController.getTags = (req: Request, res: Response) => {
  
  TagModel.find({}, (err : any, data : any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

export default TagController;
