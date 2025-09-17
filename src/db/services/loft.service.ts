import { Model } from 'mongoose';

import {
  howToDoItModel,
  ILoft,
  myEquipmentModel,
  myPhotoModel,
  myVideoModel,
  photoFromInternetModel,
  videoFromInternetModel,
} from '../../db/models/Loft';

export const getMyPhotos = async (
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const items = await myPhotoModel.find().sort(sortOption).lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'my-photos',
  }));
};

export const getPhotosFromInternet = async (
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const items = await photoFromInternetModel.find().sort(sortOption).lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'internet-photos',
  }));
};

export const getMyVideos = async (
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const items = await myVideoModel.find().sort(sortOption).lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'my-videos',
  }));
};

export const getVideosFromInternet = async (
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const items = await videoFromInternetModel.find().sort(sortOption).lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'internet-videos',
  }));
};

export const getMyEquipment = async (
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const items = await myEquipmentModel.find().sort(sortOption).lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    category: 'my-equipment',
  }));
};

export const getHowToDoIt = async (
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const items = await howToDoItModel.find().sort(sortOption).lean();
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
