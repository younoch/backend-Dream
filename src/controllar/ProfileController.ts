import { Request, Response } from "express";
import { google } from "googleapis";
var jwt = require("jsonwebtoken");
import ProfileModel from "../models/ProfileModel";

const ProfileControllar: any = {};

ProfileControllar.CreateProfile = (req: Request, res: Response) => {
  let reqBody = req.body;
  ProfileModel.create(reqBody, (err: any, data: any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
ProfileControllar.UserLogin = (req: Request, res: Response) => {
  let username = req.body["username"];
  let password = req.body["password"];

  ProfileModel.find(
    { username: username, password: password },
    (err: any, data: any) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        if (data.length) {
          let Payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: data[0],
          };
          let token = jwt.sign(Payload, "nawaNoor");
          res
            .status(200)
            .json({ status: "login success", token: token, data: data[0] });
        } else {
          res.status(401).json({ status: "unauthorized", data: err });
        }
      }
    }
  );
};
ProfileControllar.SelectProfile = (req: Request, res: Response) => {
  let username = req.headers["username"];

  ProfileModel.find({ username: username }, (err: any, data: any) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

ProfileControllar.UpdateProfile = (req: Request, res: Response) => {
  let username = req.headers["username"];
  let reqBody = req.body;

  ProfileModel.updateOne(
    { username: username },
    { $set: reqBody },
    { upsert: true },
    (err: any, data: any) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};

ProfileControllar.loginWithGmail = (req: Request, res: Response) => {
  let username = req.headers["username"];
  let reqBody = req.body;

  ProfileModel.updateOne(
    { username: username },
    { $set: reqBody },
    { upsert: true },
    (err: any, data: any) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};

export default ProfileControllar;
