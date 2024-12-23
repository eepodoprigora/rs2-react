import { useState, useCallback } from "react";
import axios from "axios";

export const useLoadData = <T>(url: string, isList: boolean = false) => {
  const [data, setData] = useState<T | T[] | null>(null);
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
        if (isList) {
          const currentPage = reset ? 1 : page;
          const response = await axios.get(url, {
            params: { page: currentPage },
          });

          const newData = response.data.results || [];
          if (reset) {
            setData(newData);
            setPage(2);
          } else {
            setData((prevData) =>
              Array.isArray(prevData) ? [...prevData, ...newData] : newData
            );
            setPage((prevPage) => prevPage + 1);
          }

          setHasMore(response.data.info?.next !== null);
        } else {
          const response = await axios.get(url);
          setData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    },
    [url, page, hasMore, loading, isList]
  );

  return { data, loading, error, fetchData, hasMore };
};
