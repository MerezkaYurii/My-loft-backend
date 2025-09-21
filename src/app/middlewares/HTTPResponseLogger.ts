// import type { NextFunction, Request, Response } from 'express';
// import type { ExpressMiddlewareInterface } from 'routing-controllers';

// export class HTTPResponseLogger implements ExpressMiddlewareInterface {
//   use(request: Request, response: Response, next: NextFunction) {
//     const { originalUrl, method } = request;

//     const { statusCode } = response;

//     console.log(
//       `Response request: method=${method} path=${originalUrl} statusCode=${statusCode}`,
//     );

//     next();
//   }
// }

import type { NextFunction, Request, Response } from 'express';
import type { ExpressMiddlewareInterface } from 'routing-controllers';

export class HTTPResponseLogger implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      console.log(
        `Response request: method=${req.method} path=${req.originalUrl} statusCode=${res.statusCode}`,
      );
    });
    next();
  }
}
