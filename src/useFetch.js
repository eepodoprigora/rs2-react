import { useCallback, useEffect, useState } from "react";

export function useFetch(initialUrl) {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async (fetchUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(`Ошибка загрузки: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(url);
  }, [url, fetchData]);

  const refetch = useCallback(
    ({ params } = {}) => {
      let newUrl = initialUrl;
      if (params) {
        const query = new URLSearchParams(params).toString();
        newUrl = `${initialUrl}?${query}`;
      }
      setUrl(newUrl);
    },
    [initialUrl]
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
