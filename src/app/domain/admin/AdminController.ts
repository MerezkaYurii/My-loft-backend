// src/app/domain/admin/AdminController.ts
import {
  JsonController,
  Post,
  Body,
  BadRequestError,
} from 'routing-controllers';
// import {
//   howToDoItModel,
//   myEquipmentModel,
//   myPhotoModel,
//   myVideoModel,
//   photoFromInternetModel,
//   videoFromInternetModel,
// } from 'db/models/Loft';

import {
  howToDoItModel,
  myEquipmentModel,
  myPhotoModel,
  myVideoModel,
  photoFromInternetModel,
  videoFromInternetModel,
} from '../../../db/models/Loft';

// import { ApiResponse } from 'helpers/ApiResponse';
import { ApiResponse } from '../../../helpers/ApiResponse';

const modelsMap = {
  myPhoto: myPhotoModel,
  photoFromInternet: photoFromInternetModel,
  myVideo: myVideoModel,
  videoFromInternet: videoFromInternetModel,
  myEquipment: myEquipmentModel,
  howToDoIt: howToDoItModel,
};
interface CreateLoftDto {
  title: string;
  description?: string;
  thumbnail: string;
  type: 'photo' | 'video';
  category:
    | 'myPhoto'
    | 'photoFromInternet'
    | 'myVideo'
    | 'videoFromInternet'
    | 'myEquipment'
    | 'howToDoIt';
}
@JsonController('/admin')
export default class AdminController {
  @Post('/create-loft')
  async create(@Body() body: CreateLoftDto) {
    const { category, ...data } = body;

    const model = modelsMap[category as keyof typeof modelsMap];
    if (!model) {
      throw new BadRequestError(`Unknown category: ${category}`);
    }

    const created = await model.create(data);

    return new ApiResponse(true, created);
  }
}
