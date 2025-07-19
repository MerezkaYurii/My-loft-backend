// import { HTTPResponseLogger } from '@app/middlewares/HTTPResponseLogger';

// import { Get, JsonController, Param, UseAfter } from 'routing-controllers';
// import { ApiResponse } from 'helpers/ApiResponse';

// import { ApiError } from 'helpers/ApiError';
// import { loftType } from './loft.types';

// @JsonController('/loft')
// export default class Loft {
//   @Get()
//   @UseAfter(HTTPResponseLogger)
//   async getAll() {
//     // const lofts = await loftCollection.find().lean().select('-__v');

//     const lofts = (await loftCollection.find().select('-__v').lean()).map(
//       ({ _id, ...rest }) => ({
//         id: _id.toString(),
//         ...rest,
//       }),
//     );

//     return new ApiResponse(true, lofts);
//   }

//   @Get('/:id')
//   async getOne(@Param('id') id: string): Promise<ApiResponse<loftType | null>> {
//     const loft = await loftCollection.findById(id).select('-__v').lean();

//     if (!loft) {
//       throw new ApiError(404, {
//         code: 'PERSON_NOT_FOUND',
//         message: `Person with id ${id} not found`,
//       });
//     }
//     const { _id, ...rest } = loft;
//     const loftClean: loftType = {
//       id: _id.toString(),
//       ...rest,
//     };

//     return new ApiResponse(true, loftClean);
//   }
// }
