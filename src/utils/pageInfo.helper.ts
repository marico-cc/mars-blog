export const getPageInfo = (
  page: number,
  pageSize: number,
  total: number
): {
  current: number;
  pageSize: number;
  total: number;
} => {
  const totalPages = Math.ceil(total / pageSize);
  const current = page > totalPages ? totalPages : page;
  return {
    current,
    pageSize,
    total
  };
};
