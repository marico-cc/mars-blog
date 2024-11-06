import { useState } from 'react';

export const usePagination = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    total: 0
  });

  return {
    pagination,
    setPagination,
    loading,
    setLoading
  };
};
