import { Request, Response } from "express";
import ContactUsModel from "../models/ContactUsModel";
import type { IContactUs } from "../models";

const ContactUsController: any = {};

ContactUsController.createContactMessage = (req: Request, res: Response) => {
  let reqBody : IContactUs = req.body;
  const PostBody: IContactUs = {
    name: reqBody.name,
    email: reqBody.email,
    subject: reqBody.subject,
    message: reqBody.message,
  };

  ContactUsModel.create(PostBody, (err: any, data: any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

export default ContactUsController;