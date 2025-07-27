"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoftItemById = exports.createHowToDoIt = exports.createMyEquipment = exports.createVideosFromInternet = exports.createMyVideos = exports.createPhotosFromInternet = exports.createMyPhoto = exports.getHowToDoIt = exports.getMyEquipment = exports.getVideosFromInternet = exports.getMyVideos = exports.getPhotosFromInternet = exports.getMyPhotos = void 0;
const Loft_1 = require("db/models/Loft");
const getMyPhotos = async () => {
    const items = await Loft_1.myPhotoModel.find().lean();
    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'my-photos',
    }));
};
exports.getMyPhotos = getMyPhotos;
const getPhotosFromInternet = async () => {
    const items = await Loft_1.photoFromInternetModel.find().lean();
    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'internet-photos',
    }));
};
exports.getPhotosFromInternet = getPhotosFromInternet;
const getMyVideos = async () => {
    const items = await Loft_1.myVideoModel.find().lean();
    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'my-videos',
    }));
};
exports.getMyVideos = getMyVideos;
const getVideosFromInternet = async () => {
    const items = await Loft_1.videoFromInternetModel.find().lean();
    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'internet-videos',
    }));
};
exports.getVideosFromInternet = getVideosFromInternet;
const getMyEquipment = async () => {
    const items = await Loft_1.myEquipmentModel.find().lean();
    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'my-equipment',
    }));
};
exports.getMyEquipment = getMyEquipment;
const getHowToDoIt = async () => {
    const items = await Loft_1.howToDoItModel.find().lean();
    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'how-to',
    }));
};
exports.getHowToDoIt = getHowToDoIt;
const createMyPhoto = (data) => {
    return Loft_1.myPhotoModel.create(data);
};
exports.createMyPhoto = createMyPhoto;
const createPhotosFromInternet = (data) => {
    return Loft_1.photoFromInternetModel.create(data);
};
exports.createPhotosFromInternet = createPhotosFromInternet;
const createMyVideos = (data) => {
    return Loft_1.myVideoModel.create(data);
};
exports.createMyVideos = createMyVideos;
const createVideosFromInternet = (data) => {
    return Loft_1.videoFromInternetModel.create(data);
};
exports.createVideosFromInternet = createVideosFromInternet;
const createMyEquipment = (data) => {
    return Loft_1.myEquipmentModel.create(data);
};
exports.createMyEquipment = createMyEquipment;
const createHowToDoIt = (data) => {
    return Loft_1.howToDoItModel.create(data);
};
exports.createHowToDoIt = createHowToDoIt;
//---------------------------------
const getLoftItemById = async (category, id) => {
    const modelMap = {
        'my-photos': Loft_1.myPhotoModel,
        'internet-photos': Loft_1.photoFromInternetModel,
        'my-videos': Loft_1.myVideoModel,
        'internet-videos': Loft_1.videoFromInternetModel,
        'my-equipment': Loft_1.myEquipmentModel,
        'how-to': Loft_1.howToDoItModel,
    };
    const model = modelMap[category];
    if (!model) {
        throw new Error(`Unknown category: ${category}`);
    }
    const doc = await model.findById(id);
    if (!doc) {
        throw new Error(`Item not found in category: ${category}`);
    }
    const item = doc.toObject();
    return {
        ...item,
        _id: doc._id.toString(),
        category,
    };
};
exports.getLoftItemById = getLoftItemById;
//# sourceMappingURL=loft.service.js.map