import { useState, useCallback } from "react";
import axios from "axios";

const useLoadData = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);
      setError(null);

      try {
        const currentPage = reset ? 1 : page;
        const response = await axios.get(url, {
          params: { page: currentPage },
        });
        const newData = response.data.results || [];
        if (reset) {
          setData(newData);
          setPage(2);
        } else {
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1);
        }

        setHasMore(response.data.info?.next !== null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    },
    [url, page, hasMore, loading]
  );

  return { data, loading, error, fetchData, hasMore };
};

export default useLoadData;
