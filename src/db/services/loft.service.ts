// db/services/loft.service.ts

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
