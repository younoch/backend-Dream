import express, { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import ProfileController from "../controllar/ProfileController";
import QuoteListController from "../controllar/QuoteListController";
import TagController from "../controllar/TagController";
import ContactUsController from "../controllar/ContactUsController";
import AuthVerifiyMiddlewere from "../middleware/AuthVerifiyMiddlewere";


const router: Router = express.Router();
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images')
    },
    filename: (req, file, cb) => {
      cb(null, req.query._id + '.png' );
    }
  })
  const upload = multer(
  { 
    storage: storage,
    limits: {
      fileSize: 1000000
    }
   },
  ); 

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

//Quote controllar Implementation

router.post("/add-quote", (req: Request, res: Response) => {
  QuoteListController.addQuote(req, res);
});

router.post("/upload-image-by-id", upload.single('image'), (req: Request, res: Response) => {
  QuoteListController.coverUpload(req, res);
});

router.get("/get-quotes", (req: Request, res: Response) => {
  QuoteListController.getQuotes(req, res);
});

router.get("/get-single-quote/:id", (req: Request, res: Response) => {
  QuoteListController.getQuoteByID(req, res);
});
router.get("/get-quote-by-slug/:slug", (req: Request, res: Response) => {
  QuoteListController.getQuoteBySlug(req, res);
});

router.put("/update-quote", (req: Request, res: Response) => {
  QuoteListController.updateQuote(req, res);
});

router.delete("/delete-quote", (req: Request, res: Response) => {
  QuoteListController.deleteQuote(req, res);
});

router.get("/search-quotes", (req: Request, res: Response) => {
  QuoteListController.searchQuotes(req, res);
});

router.get(
  "/get-quotes-by-category/:category_id",
  (req: Request, res: Response) => {
    QuoteListController.getQuotesByCategory(req, res);
  }
);

router.get("/get-quotes-by-tag", (req: Request, res: Response) => {
  QuoteListController.getQuotesByTag(req, res);
});

// Tegs Controller Implementation

router.get("/get-tags", (req: Request, res: Response) => {
  TagController.getTags(req, res);
});

//
router.post("/create-contact-message", (req: Request, res: Response) => {
  ContactUsController.createContactMessage(req, res);
});

module.exports = router;
