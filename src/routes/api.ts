import express, { Router, Request, Response } from "express";
import ProfileController from "../controllar/ProfileController";
import QuoteListController from "../controllar/QuoteListController";
import TagController from "../controllar/TagController";
import AuthVerifiyMiddlewere from "../middleware/AuthVerifiyMiddlewere";

const router: Router = express.Router();

router.get("/testApi", (req: Request, res: Response) => {
  ProfileController.testApi(req, res);
});

router.post("/CreateProfile", (req: Request, res: Response) => {
  ProfileController.CreateProfile(req, res);
});

router.post("/UserLogin", (req: Request, res: Response) => {
  ProfileController.UserLogin(req, res);
});

router.get(
  "/SelectProfile",
  AuthVerifiyMiddlewere,
  (req: Request, res: Response) => {
    ProfileController.SelectProfile(req, res);
  }
);

router.post(
  "/UpdateProfile",
  AuthVerifiyMiddlewere,
  (req: Request, res: Response) => {
    ProfileController.UpdateProfile(req, res);
  }
);

router.post("/add-quote", (req: Request, res: Response) => {
  QuoteListController.addQuote(req, res);
});

router.get("/get-quotes", (req: Request, res: Response) => {
  TagController.getTags(req, res);
});

router.put("/update-quote", (req: Request, res: Response) => {
  QuoteListController.updateQuote(req, res);
});

router.get("/get-tags", (req: Request, res: Response) => {
  QuoteListController.getTags(req, res);
});

router.get("/search-quotes", (req: Request, res: Response) => {
  QuoteListController.searchQuotes(req, res);
});

module.exports = router;
