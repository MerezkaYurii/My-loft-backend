"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
//index.ts
const contact_controller_1 = require("./contact/contact.controller");
const LoftController_1 = __importDefault(require("./loft/LoftController"));
const UploadController_1 = require("./upload/UploadController");
const controllers = [LoftController_1.default, contact_controller_1.ContactController, UploadController_1.UploadController];
exports.controllers = controllers;
//# sourceMappingURL=index.js.map