import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFileService } from './interface/fileService';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService implements IFileService {
  async saveImage(image: Express.Multer.File) {
    try {
      const fileExt = image.originalname.split('.').at(-1);
      const newFileName = (await uuid.v4()) + '.' + fileExt;
      const filePath = path.resolve(__dirname, '../../', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, newFileName), image.buffer);

      return newFileName;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
