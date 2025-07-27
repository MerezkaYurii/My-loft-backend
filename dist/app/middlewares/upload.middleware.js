"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage(); // файл хранится в оперативке
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        console.log('📥 multer received file:', file.originalname);
        cb(null, true);
    },
});
//# sourceMappingURL=upload.middleware.js.map