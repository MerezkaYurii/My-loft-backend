import { JsonController, Get, UseAfter } from 'routing-controllers';
import { HTTPResponseLogger } from '@app/middlewares/HTTPResponseLogger';
import { ApiResponse } from 'helpers/ApiResponse';

import {
  getMyPhotos,
  getPhotosFromInternet,
  getMyVideos,
  getVideosFromInternet,
  getMyEquipment,
  getHowToDoIt,
} from 'db/services/loft.service';

@JsonController('/loft')
export default class LoftController {
  @Get('/my-photos')
  @UseAfter(HTTPResponseLogger)
  async myPhotos() {
    const data = await getMyPhotos();
    return new ApiResponse(true, data);
  }

  @Get('/photos-from-internet')
  async photosFromInternet() {
    const data = await getPhotosFromInternet();
    return new ApiResponse(true, data);
  }

  @Get('/my-videos')
  async myVideos() {
    const data = await getMyVideos();
    return new ApiResponse(true, data);
  }

  @Get('/videos-from-internet')
  async videosFromInternet() {
    const data = await getVideosFromInternet();
    return new ApiResponse(true, data);
  }

  @Get('/my-equipment')
  async myEquipment() {
    const data = await getMyEquipment();
    return new ApiResponse(true, data);
  }

  @Get('/how-to-do-it')
  async howToDoIt() {
    const data = await getHowToDoIt();
    return new ApiResponse(true, data);
  }
}
