// helpers/paginate.ts
export function paginate<T>(data: T[], page: number, limit: number) {
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
