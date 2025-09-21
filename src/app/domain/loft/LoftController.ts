import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  NotFoundError,
  QueryParam,
} from 'routing-controllers';

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
  getLoftItemById,
} from '../../../db/services/loft.service';
import { ILoft } from '../../../db/models/Loft';
import { parsePaginationParams } from 'utils/parsePaginationParams';

@JsonController('/loft')
export default class LoftController {
  //--------------get--------------
  @Get('/my-photos')
  async getMyPhotosList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    // const { pageNum, limitNum } = parsePaginationParams({ page, limit });

    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);
    const sortField = sort || 'createdAt';
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    const { items, pagination } = await getMyPhotos(
      pageNum,
      limitNum,
      sort,
      order,
    );
    return {
      success: true,
      data: {
        pagination,
      },
      debug: {
        page,
        limit,
        pageNum,
        limitNum,
        sort: sortField,
        order: sortOrder,
      },
    };
  }

  @Get('/internet-photos')
  async getPhotosFromInternetList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const { pageNum, limitNum } = parsePaginationParams({ page, limit });

    const result = await getPhotosFromInternet(pageNum, limitNum, sort, order);

    return result;
  }

  @Get('/my-videos')
  async getMyVideosList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const { pageNum, limitNum } = parsePaginationParams({ page, limit });

    const result = await getMyVideos(pageNum, limitNum, sort, order);

    return result;
  }

  @Get('/internet-videos')
  async getVideosFromInternetList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const { pageNum, limitNum } = parsePaginationParams({ page, limit });
    const result = await getVideosFromInternet(pageNum, limitNum, sort, order);
    return result;
  }

  @Get('/my-equipment')
  async getMyEquipmentList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const { pageNum, limitNum } = parsePaginationParams({ page, limit });

    const result = await getMyEquipment(pageNum, limitNum, sort, order);

    return result;
  }

  @Get('/how-to')
  async getHowToDoItList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const { pageNum, limitNum } = parsePaginationParams({ page, limit });

    const result = await getHowToDoIt(pageNum, limitNum, sort, order);

    return result;
  }

  //--------------post-------------------
  @Post('/my-photos')
  async createMyPhoto(@Body() body: ILoft) {
    const created = await createMyPhoto(body);
    return { success: true, data: created.toObject() };
  }
  @Post('/internet-photos')
  async createPhotosFromInternet(@Body() body: ILoft) {
    const created = await createPhotosFromInternet(body);
    return { success: true, data: created.toObject() };
  }
  @Post('/my-videos')
  async createMyVideos(@Body() body: ILoft) {
    const created = await createMyVideos(body);
    return { success: true, data: created.toObject() };
  }
  @Post('/internet-videos')
  async createVideosFromInternet(@Body() body: ILoft) {
    const created = await createVideosFromInternet(body);
    return { success: true, data: created.toObject() };
  }
  @Post('/my-equipment')
  async createMyEquipment(@Body() body: ILoft) {
    const created = await createMyEquipment(body);
    return { success: true, data: created.toObject() };
  }
  @Post('/how-to')
  async createHowToDoIt(@Body() body: ILoft) {
    const created = await createHowToDoIt(body);
    return { success: true, data: created.toObject() };
  }

  @Get('/:category/:id')
  async getItemById(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    try {
      const item = await getLoftItemById(category, id);
      if (!item) throw new NotFoundError(`Item not found in ${category}`);
      return { success: true, data: item };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
}
