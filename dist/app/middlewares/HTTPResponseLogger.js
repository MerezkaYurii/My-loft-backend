"use strict";
// import type { NextFunction, Request, Response } from 'express';
// import type { ExpressMiddlewareInterface } from 'routing-controllers';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPResponseLogger = void 0;
class HTTPResponseLogger {
    use(req, res, next) {
        res.on('finish', () => {
            console.log(`Response request: method=${req.method} path=${req.originalUrl} statusCode=${res.statusCode}`);
        });
        next();
    }
}
exports.HTTPResponseLogger = HTTPResponseLogger;
//# sourceMappingURL=HTTPResponseLogger.js.map