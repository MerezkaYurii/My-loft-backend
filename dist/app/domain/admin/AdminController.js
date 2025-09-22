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
Object.defineProperty(exports, "__esModule", { value: true });
// src/app/domain/admin/AdminController.ts
const routing_controllers_1 = require("routing-controllers");
// import {
//   howToDoItModel,
//   myEquipmentModel,
//   myPhotoModel,
//   myVideoModel,
//   photoFromInternetModel,
//   videoFromInternetModel,
// } from '../../../db/models/Loft';
const Loft_1 = require("../../../db/models/Loft");
// import { ApiResponse } from '../../../helpers/ApiResponse';
const ApiResponse_1 = require("../../../helpers/ApiResponse");
const modelsMap = {
    myPhoto: Loft_1.myPhotoModel,
    photoFromInternet: Loft_1.photoFromInternetModel,
    myVideo: Loft_1.myVideoModel,
    videoFromInternet: Loft_1.videoFromInternetModel,
    myEquipment: Loft_1.myEquipmentModel,
    howToDoIt: Loft_1.howToDoItModel,
};
let AdminController = class AdminController {
    async create(body) {
        const { category, ...data } = body;
        const model = modelsMap[category];
        if (!model) {
            throw new routing_controllers_1.BadRequestError(`Unknown category: ${category}`);
        }
        const created = await model.create(data);
        return new ApiResponse_1.ApiResponse(true, created);
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/create-loft'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
AdminController = __decorate([
    (0, routing_controllers_1.JsonController)('/admin')
], AdminController);
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map