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
exports.ContactController = void 0;
const routing_controllers_1 = require("routing-controllers");
const formidable_1 = __importDefault(require("formidable"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const uploadDir = path_1.default.join(os_1.default.tmpdir(), 'myapp-uploads');
const promises_1 = __importDefault(require("fs/promises"));
let ContactController = class ContactController {
    async send(req, res) {
        // Оборачиваем form.parse в Promise
        const parseForm = () => new Promise((resolve, reject) => {
            const form = (0, formidable_1.default)({
                multiples: true,
                uploadDir,
                keepExtensions: true,
                maxFileSize: 50 * 1024 * 1024,
            });
            form.parse(req, (err, fields, files) => {
                if (err)
                    reject(err);
                else
                    resolve({ fields, files });
            });
        });
        try {
            const { fields, files } = await parseForm();
            const { name, email, message, link } = fields;
            const uploadedFile = Array.isArray(files.file)
                ? files.file[0]
                : files.file;
            const transporter = nodemailer_1.default.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
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
                    await promises_1.default.unlink(uploadedFile.filepath);
                    console.log('Временный файл удалён:', uploadedFile.filepath);
                }
                catch (unlinkErr) {
                    console.error('Ошибка при удалении временного файла:', unlinkErr);
                }
            }
            return res.status(200).json({ success: true });
        }
        catch (error) {
            console.error('Ошибка:', error);
            return res.status(500).json({ error: 'Не удалось отправить письмо' });
        }
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, routing_controllers_1.Post)('/'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "send", null);
exports.ContactController = ContactController = __decorate([
    (0, routing_controllers_1.JsonController)('/contact')
], ContactController);
//# sourceMappingURL=contact.controller.js.map