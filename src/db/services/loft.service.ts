// db/services/loft.service.ts
import { Model } from 'mongoose';
// import {
//   howToDoItModel,
//   ILoft,
//   myEquipmentModel,
//   myPhotoModel,
//   myVideoModel,
//   photoFromInternetModel,
//   videoFromInternetModel,
// } from 'db/models/Loft';

import {
  howToDoItModel,
  ILoft,
  myEquipmentModel,
  myPhotoModel,
  myVideoModel,
  photoFromInternetModel,
  videoFromInternetModel,
} from '../../db/models/Loft';

export const getMyPhotos = async () => {
  const items = await myPhotoModel.find().lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'my-photos',
  }));
};

export const getPhotosFromInternet = async () => {
  const items = await photoFromInternetModel.find().lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'internet-photos',
  }));
};

export const getMyVideos = async () => {
  const items = await myVideoModel.find().lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'my-videos',
  }));
};

export const getVideosFromInternet = async () => {
  const items = await videoFromInternetModel.find().lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'internet-videos',
  }));
};

export const getMyEquipment = async () => {
  const items = await myEquipmentModel.find().lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'my-equipment',
  }));
};

export const getHowToDoIt = async () => {
  const items = await howToDoItModel.find().lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'how-to',
  }));
};

export const createMyPhoto = (data: Partial<ILoft>) => {
  return myPhotoModel.create(data);
};
export const createPhotosFromInternet = (data: Partial<ILoft>) => {
  return photoFromInternetModel.create(data);
};
export const createMyVideos = (data: Partial<ILoft>) => {
  return myVideoModel.create(data);
};
export const createVideosFromInternet = (data: Partial<ILoft>) => {
  return videoFromInternetModel.create(data);
};
export const createMyEquipment = (data: Partial<ILoft>) => {
  return myEquipmentModel.create(data);
};
export const createHowToDoIt = (data: Partial<ILoft>) => {
  return howToDoItModel.create(data);
};

//---------------------------------

export const getLoftItemById = async (category: string, id: string) => {
  const modelMap: Record<string, Model<ILoft>> = {
    'my-photos': myPhotoModel,
    'internet-photos': photoFromInternetModel,
    'my-videos': myVideoModel,
    'internet-videos': videoFromInternetModel,
    'my-equipment': myEquipmentModel,
    'how-to': howToDoItModel,
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
