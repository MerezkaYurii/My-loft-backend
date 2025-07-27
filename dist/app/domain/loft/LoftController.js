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
const routing_controllers_1 = require("routing-controllers");
const loft_service_1 = require("db/services/loft.service");
const ApiResponse_1 = require("helpers/ApiResponse");
let LoftController = class LoftController {
    async getMyPhotosList() {
        const data = await (0, loft_service_1.getMyPhotos)();
        return new ApiResponse_1.ApiResponse(true, data);
    }
    async getPhotosFromInternetList() {
        const data = await (0, loft_service_1.getPhotosFromInternet)();
        return new ApiResponse_1.ApiResponse(true, data);
    }
    async getMyVideosList() {
        const data = await (0, loft_service_1.getMyVideos)();
        return new ApiResponse_1.ApiResponse(true, data);
    }
    async getVideosFromInternetList() {
        const data = await (0, loft_service_1.getVideosFromInternet)();
        return new ApiResponse_1.ApiResponse(true, data);
    }
    async getMyEquipmentList() {
        const data = await (0, loft_service_1.getMyEquipment)();
        return new ApiResponse_1.ApiResponse(true, data);
    }
    async getHowToDoItList() {
        const data = await (0, loft_service_1.getHowToDoIt)();
        return new ApiResponse_1.ApiResponse(true, data);
    }
    async createMyPhoto(body) {
        const created = await (0, loft_service_1.createMyPhoto)(body);
        return { success: true, data: created.toObject() };
    }
    async createPhotosFromInternet(body) {
        const created = await (0, loft_service_1.createPhotosFromInternet)(body);
        return { success: true, data: created.toObject() };
    }
    async createMyVideos(body) {
        const created = await (0, loft_service_1.createMyVideos)(body);
        return { success: true, data: created.toObject() };
    }
    async createVideosFromInternet(body) {
        const created = await (0, loft_service_1.createVideosFromInternet)(body);
        return { success: true, data: created.toObject() };
    }
    async createMyEquipment(body) {
        const created = await (0, loft_service_1.createMyEquipment)(body);
        return { success: true, data: created.toObject() };
    }
    async createHowToDoIt(body) {
        const created = await (0, loft_service_1.createHowToDoIt)(body);
        return { success: true, data: created.toObject() };
    }
    async getItemById(category, id) {
        try {
            const item = await (0, loft_service_1.getLoftItemById)(category, id);
            if (!item)
                throw new routing_controllers_1.NotFoundError(`Item not found in ${category}`);
            return { success: true, data: item };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/my-photos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getMyPhotosList", null);
__decorate([
    (0, routing_controllers_1.Get)('/internet-photos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getPhotosFromInternetList", null);
__decorate([
    (0, routing_controllers_1.Get)('/my-videos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getMyVideosList", null);
__decorate([
    (0, routing_controllers_1.Get)('/internet-videos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getVideosFromInternetList", null);
__decorate([
    (0, routing_controllers_1.Get)('/my-equipment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getMyEquipmentList", null);
__decorate([
    (0, routing_controllers_1.Get)('/how-to'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getHowToDoItList", null);
__decorate([
    (0, routing_controllers_1.Post)('/my-photos'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "createMyPhoto", null);
__decorate([
    (0, routing_controllers_1.Post)('/internet-photos'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "createPhotosFromInternet", null);
__decorate([
    (0, routing_controllers_1.Post)('/my-videos'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "createMyVideos", null);
__decorate([
    (0, routing_controllers_1.Post)('/internet-videos'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "createVideosFromInternet", null);
__decorate([
    (0, routing_controllers_1.Post)('/my-equipment'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "createMyEquipment", null);
__decorate([
    (0, routing_controllers_1.Post)('/how-to'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "createHowToDoIt", null);
__decorate([
    (0, routing_controllers_1.Get)('/:category/:id'),
    __param(0, (0, routing_controllers_1.Param)('category')),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LoftController.prototype, "getItemById", null);
LoftController = __decorate([
    (0, routing_controllers_1.JsonController)('/loft')
], LoftController);
exports.default = LoftController;
//# sourceMappingURL=LoftController.js.map