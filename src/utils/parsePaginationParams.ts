const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = ({ page, limit }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedLimit = parseNumber(limit, 8);

  return {
    pageNum: parsedPage,
    limitNum: parsedLimit,
  };
};
