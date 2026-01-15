import { Express } from 'express';

export interface IFileService {
  saveImage: (image: Express.Multer.File) => Promise<string>;
}
