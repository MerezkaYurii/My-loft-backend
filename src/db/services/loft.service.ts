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
  pageNum: number = 1,
  limitNum: number = 8,
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const total = await myPhotoModel.countDocuments();
  const totalPages = Math.ceil(total / limitNum);
  const skip = (pageNum - 1) * limitNum;
  const items = await myPhotoModel
    .find()
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();

  return {
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'my-photos',
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
    },
  };
};

export const getPhotosFromInternet = async (
  pageNum: number = 1,
  limitNum: number = 8,
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const total = await photoFromInternetModel.countDocuments();
  const totalPages = Math.ceil(total / limitNum);
  const skip = (pageNum - 1) * limitNum;
  const items = await photoFromInternetModel
    .find()
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();
  return {
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'internet-photos',
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
    },
  };
};

export const getMyVideos = async (
  pageNum: number = 1,
  limitNum: number = 8,
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };

  const total = await myVideoModel.countDocuments();
  const totalPages = Math.ceil(total / limitNum);
  const skip = (pageNum - 1) * limitNum;

  const items = await myVideoModel
    .find()
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();
  return {
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'my-videos',
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
    },
  };
};

export const getVideosFromInternet = async (
  pageNum: number = 1,
  limitNum: number = 8,
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };

  const total = await videoFromInternetModel.countDocuments();
  const totalPages = Math.ceil(total / limitNum);
  const skip = (pageNum - 1) * limitNum;

  const items = await videoFromInternetModel
    .find()
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();
  return {
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'internet-videos',
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
    },
  };
};

export const getMyEquipment = async (
  pageNum: number = 1,
  limitNum: number = 8,
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const total = await myEquipmentModel.countDocuments();
  const totalPages = Math.ceil(total / limitNum);
  const skip = (pageNum - 1) * limitNum;
  const items = await myEquipmentModel
    .find()
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();
  return {
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'my-equipment',
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
    },
  };
};

export const getHowToDoIt = async (
  pageNum: number = 1,
  limitNum: number = 8,
  sort: string = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) => {
  const sortOption: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };
  const total = await howToDoItModel.countDocuments();
  const totalPages = Math.ceil(total / limitNum);
  const skip = (pageNum - 1) * limitNum;
  const items = await howToDoItModel
    .find()
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();
  return {
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: 'how-to',
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
    },
  };
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
