"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
// helpers/paginate.ts
function paginate(data, page, limit) {
    const total = data.length;
    const start = (page - 1) * limit;
    const items = data.slice(start, start + limit);
    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
//# sourceMappingURL=paginate.js.map