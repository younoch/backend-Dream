// multer.d.ts
import { Request } from 'express';

declare module 'express' {
  interface MulterRequest extends Request {
    file: Express.Multer.File;
  }
}
