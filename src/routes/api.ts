import express, { Router , Request, Response } from 'express';
import ProfileControllar from '../controllar/ProfileControallar';
import QuoteListControallar from '../controllar/QuoteListControallar';
import AuthVerifiyMiddlewere from '../middleware/AuthVerifiyMiddlewere';

const router: Router = express.Router();

router.get("/testApi", (req: Request, res: Response) => {
  ProfileControllar.testApi(req, res);
});

router.post("/CreateProfile", (req: Request, res: Response) => {
  ProfileControllar.CreateProfile(req, res);
});

router.post("/UserLogin", (req: Request, res: Response) => {
  ProfileControllar.UserLogin(req, res);
});

router.get("/SelectProfile", AuthVerifiyMiddlewere, (req: Request, res: Response) => {
  ProfileControllar.SelectProfile(req, res);
});

router.post("/UpdateProfile", AuthVerifiyMiddlewere, (req: Request, res: Response) => {
  ProfileControllar.UpdateProfile(req, res);
});

router.post("/add-quote", (req: Request, res: Response) => {
  QuoteListControallar.addQuote(req, res);
});

router.get("/get-quotes", (req: Request, res: Response) => {
  QuoteListControallar.getQuotes(req, res);
});

router.put("/update-quote", (req: Request, res: Response) => {
  QuoteListControallar.updateQuote(req, res);
});

router.get("/get-tags", (req: Request, res: Response) => {
  QuoteListControallar.getTags(req, res);
});

router.get("/search-quotes", (req: Request, res: Response) => {
  QuoteListControallar.searchQuotes(req, res);
});

module.exports = router;