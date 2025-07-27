import { JsonController, Post, Res, Req, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import cloudinary from 'utils/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import {
  howToDoItModel,
  myEquipmentModel,
  myPhotoModel,
  myVideoModel,
  photoFromInternetModel,
  videoFromInternetModel,
} from 'db/models/Loft';
// import { upload } from '@app/middlewares/upload.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { Request as ExpressRequest } from 'express';

class UploadBody {
  title: string;
  description?: string;
  type: string;
  category: string;
  thumbnail: string;
}

interface UploadRequest extends ExpressRequest {
  body: UploadBody;
  file?: Express.Multer.File;
}

const modelsMap = {
  myPhoto: myPhotoModel,
  photoFromInternet: photoFromInternetModel,
  myVideo: myVideoModel,
  videoFromInternet: videoFromInternetModel,
  myEquipment: myEquipmentModel,
  howToDoIt: howToDoItModel,
};

@JsonController('/upload')
export class UploadController {
  @Post('/')
  @UseBefore(upload.single('file'))
  async uploadFile(
    // @UploadedFile('file') file: Express.Multer.File,
    // @Body() body: UploadBody,
    @Req() req: UploadRequest,
    @Res() res: Response,
  ) {
    try {
      const body = req.body;
      const file = req.file;

      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing form data' });
      }
      const { title, description, type, category, thumbnail } = body;
      console.log('🟡 req.body:', req.body);
      if ('file' in req) {
        console.log('🟡 req.file:', req.file);
      }
      console.log('🟡 UploadedFile:', file);
      console.log('🟡 Body:', body);
      console.log('📦 file:', file);

      let finalUrl = thumbnail; // по умолчанию — ссылка из формы

      // Если файл загружен — загружаем в Cloudinary

      if (file) {
        const uploadResult = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: 'auto', folder: `loft-uploads/${category}` },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as UploadApiResponse);
              },
            );
            stream.end(file.buffer);
          },
        );

        finalUrl = uploadResult.secure_url; // переопределяем ссылку
      }

      if (!finalUrl) {
        return res.status(400).json({ error: 'No file or thumbnail provided' });
      }

      const categoryAliasMap = {
        'my-videos': 'myVideo',
        'my-photos': 'myPhoto',
        'video-from-internet': 'videoFromInternet',
        'photo-from-internet': 'photoFromInternet',
        'how-to-do-it': 'howToDoIt',
        'my-equipment': 'myEquipment',
      };

      const realCategory = categoryAliasMap[category] || category;
      const model = modelsMap[realCategory as keyof typeof modelsMap];
      if (!model) {
        return res.status(400).json({ error: `Unknown category: ${category}` });
      }

      const newItem = await model.create({
        title,
        description,
        thumbnail: finalUrl,
        type,
        category,
      });
      console.log('🧾 Пытаемся сохранить в MongoDB:', newItem);
      await newItem.save();
      console.log('✅ Сохранено в MongoDB:', newItem);
      return res.json({ success: true, item: newItem });
    } catch (error) {
      console.error('❌ Ошибка при сохранении в MongoDB, Upload error:', error);
      return res
        .status(500)
        .json({ error: 'Upload or save failed', details: error });
    }
  }
}
