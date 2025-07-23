import { JsonController, Post, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';
import formidable, { Fields, Files } from 'formidable';
import nodemailer from 'nodemailer';
import os from 'os';
import path from 'path';

const uploadDir = path.join(os.tmpdir(), 'myapp-uploads');

import fs from 'fs/promises';

@JsonController('/contact')
export class ContactController {
  @Post('/')
  async send(@Req() req: Request, @Res() res: Response) {
    // Оборачиваем form.parse в Promise
    const parseForm = (): Promise<{ fields: Fields; files: Files }> =>
      new Promise((resolve, reject) => {
        const form = formidable({
          multiples: true,
          uploadDir,
          keepExtensions: true,
          maxFileSize: 50 * 1024 * 1024,
        });

        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

    try {
      const { fields, files } = await parseForm();

      const { name, email, message, link } = fields;
      // const uploadedFile = files.file as File | File[] | undefined;
      const uploadedFile = Array.isArray(files.file)
        ? files.file[0]
        : files.file;

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Новое сообщение с сайта',
        html: `
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Ссылка:</strong> ${link}</p>
          <p><strong>Сообщение:</strong> ${message}</p>
        `,
        attachments: uploadedFile
          ? [
              {
                filename: uploadedFile.originalFilename || 'file',
                path: uploadedFile.filepath,
                contentType: uploadedFile.mimetype,
              },
            ]
          : [],
      };

      await transporter.sendMail(mailOptions);

      // Если есть файл — прикрепляем
      if (uploadedFile && !(uploadedFile instanceof Array)) {
        try {
          await fs.unlink(uploadedFile.filepath);
          console.log('Временный файл удалён:', uploadedFile.filepath);
        } catch (unlinkErr) {
          console.error('Ошибка при удалении временного файла:', unlinkErr);
        }
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Ошибка:', error);
      return res.status(500).json({ error: 'Не удалось отправить письмо' });
    }
  }
}
