import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
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

const oauth2Client = new google.auth.OAuth2(
  "1020624758621-j2g33dr7vbtc10ctu52h62hvuoubp0at.apps.googleusercontent.com",
  "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",
  "https://www.the-speakers.com"
);

const scopes = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",

  scope: scopes,
});

ProfileControllar.loginWithGmail = (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <meta name="google-signin-client_id" content="1020624758621-j2g33dr7vbtc10ctu52h62hvuoubp0at.apps.googleusercontent.com">
        <script src="[5](https://apis.google.com/js/platform.js)" async defer></script>
      </head>
      <body>
        <h1>Gmail Login Example</h1>
        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
        <script>
          function onSignIn(googleUser) {
            // Get the ID token from the GoogleUser object
            var id_token = googleUser.getAuthResponse().id_token;
            // Redirect to the OAuth2 callback endpoint with the ID token as a query parameter
            window.location.href = "/auth/google/callback?code=" + id_token;
          }
        </script>
      </body>
    </html>
  `);
};


ProfileControllar.gmailCallBack =  async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);

    oauth2Client.setCredentials(tokens);

    const profile = await google.oauth2("v2").userinfo.get({
      auth: oauth2Client,
    });

    const gmail = await google.gmail("v1").users.messages.list({
      auth: oauth2Client,
      userId: "me",
    });

    res.send({ profile, gmail });
  } catch (error) {
    console.error(error);
    res.status(500).send((error as Error).message);

  }
};

export default ProfileControllar;
