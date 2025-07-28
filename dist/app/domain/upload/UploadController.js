"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const routing_controllers_1 = require("routing-controllers");
// import cloudinary from 'utils/cloudinary';
const cloudinary_1 = __importDefault(require("../../../utils/cloudinary"));
// import {
//   howToDoItModel,
//   myEquipmentModel,
//   myPhotoModel,
//   myVideoModel,
//   photoFromInternetModel,
//   videoFromInternetModel,
// } from 'db/models/Loft';
const Loft_1 = require("../../../db/models/Loft");
// import { upload } from '@app/middlewares/upload.middleware';
const upload_middleware_1 = require("../../middlewares/upload.middleware");
class UploadBody {
}
const modelsMap = {
    myPhoto: Loft_1.myPhotoModel,
    photoFromInternet: Loft_1.photoFromInternetModel,
    myVideo: Loft_1.myVideoModel,
    videoFromInternet: Loft_1.videoFromInternetModel,
    myEquipment: Loft_1.myEquipmentModel,
    howToDoIt: Loft_1.howToDoItModel,
};
let UploadController = class UploadController {
    async uploadFile(req, res) {
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
                const uploadResult = await new Promise((resolve, reject) => {
                    const stream = cloudinary_1.default.uploader.upload_stream({ resource_type: 'auto', folder: `loft-uploads/${category}` }, (error, result) => {
                        if (error)
                            reject(error);
                        else
                            resolve(result);
                    });
                    stream.end(file.buffer);
                });
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
            const model = modelsMap[realCategory];
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
        }
        catch (error) {
            console.error('❌ Ошибка при сохранении в MongoDB, Upload error:', error);
            return res
                .status(500)
                .json({ error: 'Upload or save failed', details: error });
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.UseBefore)(upload_middleware_1.upload.single('file')),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, routing_controllers_1.JsonController)('/upload')
], UploadController);
//# sourceMappingURL=UploadController.js.map