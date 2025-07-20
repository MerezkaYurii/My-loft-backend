// db/services/loft.service.ts
import { Model } from 'mongoose';
import {
  howToDoItModel,
  ILoft,
  myEquipmentModel,
  myPhotoModel,
  myVideoModel,
  photoFromInternetModel,
  videoFromInternetModel,
} from 'db/models/Loft';

export const getMyPhotos = () => myPhotoModel.find().lean();
export const getPhotosFromInternet = () => photoFromInternetModel.find().lean();
export const getMyVideos = () => myVideoModel.find().lean();
export const getVideosFromInternet = () => videoFromInternetModel.find().lean();
export const getMyEquipment = () => myEquipmentModel.find().lean();
export const getHowToDoIt = () => howToDoItModel.find().lean();

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

  const item = await model.findById(id).lean();

  if (!item) {
    throw new Error(`Item not found in category: ${category}`);
  }

  return item;
};
