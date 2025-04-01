import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  saveFile(file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', 'user-images');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return `user-images/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при сохранении файла');
    }
  }

  removeFile(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении файла');
    }
  }
}
