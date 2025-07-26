//index.ts
import { ContactController } from './contact/contact.controller';
import LoftController from './loft/LoftController';
import { UploadController } from './upload/UploadController';

const controllers = [LoftController, ContactController, UploadController];

export { controllers };
