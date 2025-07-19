import { JsonController, Get, Post, Body } from 'routing-controllers';
import {
  getMyPhotos,
  getPhotosFromInternet,
  getMyVideos,
  getVideosFromInternet,
  getMyEquipment,
  getHowToDoIt,
  createMyPhoto,
  createPhotosFromInternet,
  createMyVideos,
  createVideosFromInternet,
  createMyEquipment,
  createHowToDoIt,
} from 'db/services/loft.service';
import { ApiResponse } from 'helpers/ApiResponse';
import { ILoft } from 'db/models/Loft';

@JsonController('/loft')
export default class LoftController {
  @Get('/my-photos')
  async getMyPhotosList() {
    const data = await getMyPhotos();
    return new ApiResponse(true, data);
  }

  @Get('/internet-photos')
  async getPhotosFromInternetList() {
    const data = await getPhotosFromInternet();
    return new ApiResponse(true, data);
  }

  @Get('/my-videos')
  async getMyVideosList() {
    const data = await getMyVideos();
    return new ApiResponse(true, data);
  }

  @Get('/internet-videos')
  async getVideosFromInternetList() {
    const data = await getVideosFromInternet();
    return new ApiResponse(true, data);
  }

  @Get('/my-equipment')
  async getMyEquipmentList() {
    const data = await getMyEquipment();
    return new ApiResponse(true, data);
  }

  @Get('/how-to')
  async getHowToDoItList() {
    const data = await getHowToDoIt();
    return new ApiResponse(true, data);
  }
  @Post('/my-photos')
  async createMyPhoto(@Body() body: ILoft) {
    const created = await createMyPhoto(body);
    return { success: true, data: created };
  }
  @Post('/internet-photos')
  async createPhotosFromInternet(@Body() body: ILoft) {
    const created = await createPhotosFromInternet(body);
    return { success: true, data: created };
  }
  @Post('/my-videos')
  async createMyVideos(@Body() body: ILoft) {
    const created = await createMyVideos(body);
    return { success: true, data: created };
  }
  @Post('/internet-videos')
  async createVideosFromInternet(@Body() body: ILoft) {
    const created = await createVideosFromInternet(body);
    return { success: true, data: created };
  }
  @Post('/my-equipment')
  async createMyEquipment(@Body() body: ILoft) {
    const created = await createMyEquipment(body);
    return { success: true, data: created };
  }
  @Post('/how-to')
  async createHowToDoIt(@Body() body: ILoft) {
    const created = await createHowToDoIt(body);
    return { success: true, data: created };
  }
}
