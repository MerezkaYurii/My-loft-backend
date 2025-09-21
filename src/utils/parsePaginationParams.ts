const parseNumber = (
  number: string | undefined,
  defaultValue: number,
): number => {
  if (!number) return defaultValue;
  const parsed = parseInt(number.trim(), 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
};

export const parsePaginationParams = ({ page, limit }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedLimit = parseNumber(limit, 8);

  return {
    pageNum: parsedPage,
    limitNum: parsedLimit,
  };
};
