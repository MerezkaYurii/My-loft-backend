"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPResponseLogger = void 0;
class HTTPResponseLogger {
    use(request, response, next) {
        const { originalUrl, method } = request;
        const { statusCode } = response;
        console.log(`Response request: method=${method} path=${originalUrl} statusCode=${statusCode}`);
        next();
    }
}
exports.HTTPResponseLogger = HTTPResponseLogger;
//# sourceMappingURL=HTTPResponseLogger.js.map