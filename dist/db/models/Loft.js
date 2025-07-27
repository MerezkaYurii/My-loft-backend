"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoftItem = exports.howToDoItModel = exports.myEquipmentModel = exports.videoFromInternetModel = exports.myVideoModel = exports.photoFromInternetModel = exports.myPhotoModel = void 0;
const mongoose_1 = require("mongoose");
const loftSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ['photo', 'video'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.myPhotoModel = (0, mongoose_1.model)('My_photo', loftSchema, 'My_photo');
exports.photoFromInternetModel = (0, mongoose_1.model)('Photo_from_internet', loftSchema, 'Photo_from_internet');
exports.myVideoModel = (0, mongoose_1.model)('My_video', loftSchema, 'My_video');
exports.videoFromInternetModel = (0, mongoose_1.model)('Video_from_internet', loftSchema, 'Video_from_internet');
exports.myEquipmentModel = (0, mongoose_1.model)('My_equipment', loftSchema, 'My_equipment');
exports.howToDoItModel = (0, mongoose_1.model)('How_to_do_it_correctly', loftSchema, 'How_to_do_it_correctly');
exports.LoftItem = (0, mongoose_1.model)('LoftItem', loftSchema);
//# sourceMappingURL=Loft.js.map