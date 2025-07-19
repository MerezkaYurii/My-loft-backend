// db/services/loft.service.ts

import {
  howToDoItModel,
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
