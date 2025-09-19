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
import logger from 'helpers/logger';

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
    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);
    const sortField = sort || 'createdAt';
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    logger.debug(
      `Controller params: pageNum=${pageNum}, limitNum=${limitNum}, sortField=${sortField}, sortOrder=${sortOrder}`,
    );

    const result = await getMyPhotos(pageNum, limitNum, sort, order);
    logger.debug(
      `Fetched data: total=${result.data.pagination.total}, totalPages=${result.data.pagination.totalPages}, itemsLength=${result.data.items.length}`,
    );

    // return new ApiResponse(true, result.data);
    return {
      success: true,
      items: result.data.items,
      pagination: result.data.pagination,
    };
  }

  @Get('/internet-photos')
  async getPhotosFromInternetList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);

    const result = await getPhotosFromInternet(pageNum, limitNum, sort, order);

    return {
      success: true,
      items: result.data.items,
      pagination: result.data.pagination,
    };
  }

  @Get('/my-videos')
  async getMyVideosList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);

    const result = await getMyVideos(pageNum, limitNum, sort, order);
    // const { items, pagination } = result.data;
    // return new ApiResponse(true, {
    //   items,
    //   pagination,
    //   debug: { pageNum, limitNum, sort, order },
    // });
    // return new ApiResponse(true, result.data);
    return {
      success: true,
      items: result.data.items,
      pagination: result.data.pagination,
    };
  }

  @Get('/internet-videos')
  async getVideosFromInternetList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);

    const result = await getVideosFromInternet(pageNum, limitNum, sort, order);
    // const { items, pagination } = result.data;
    // return new ApiResponse(true, { items, pagination });
    // return new ApiResponse(true, result.data);
    return {
      success: true,
      items: result.data.items,
      pagination: result.data.pagination,
    };
  }

  @Get('/my-equipment')
  async getMyEquipmentList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);

    const result = await getMyEquipment(pageNum, limitNum, sort, order);
    // const { items, pagination } = result.data;
    // return new ApiResponse(true, { items, pagination });
    // return new ApiResponse(true, result.data);
    return {
      success: true,
      items: result.data.items,
      pagination: result.data.pagination,
    };
  }

  @Get('/how-to')
  async getHowToDoItList(
    @QueryParam('page') page: string = '1',
    @QueryParam('limit') limit: string = '8',
    @QueryParam('sort') sort: string = 'createdAt',
    @QueryParam('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const pageNum = Math.max(parseInt(page?.trim() || '1', 10), 1);
    const limitNum = Math.max(parseInt(limit?.trim() || '8', 10), 1);

    const result = await getHowToDoIt(pageNum, limitNum, sort, order);
    // const { items, pagination } = result.data;
    // return new ApiResponse(true, { items, pagination });
    // return new ApiResponse(true, result.data);
    return {
      success: true,
      items: result.data.items,
      pagination: result.data.pagination,
    };
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
