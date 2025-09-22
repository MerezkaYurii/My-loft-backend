"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationParams = void 0;
const parseNumber = (number, defaultValue) => {
    if (!number)
        return defaultValue;
    const parsed = parseInt(number.trim(), 10);
    return Number.isNaN(parsed) ? defaultValue : parsed;
};
const parsePaginationParams = ({ page, limit }) => {
    const parsedPage = parseNumber(page, 1);
    const parsedLimit = parseNumber(limit, 8);
    return {
        pageNum: parsedPage,
        limitNum: parsedLimit,
    };
};
exports.parsePaginationParams = parsePaginationParams;
//# sourceMappingURL=parsePaginationParams.js.map