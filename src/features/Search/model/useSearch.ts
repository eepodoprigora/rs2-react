import { useState, useMemo } from "react";

interface UseSearchProps<T> {
  items: T[];
  searchField: keyof T;
}

export function useSearch<T>({ items, searchField }: UseSearchProps<T>) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();

    return items.filter((item) => {
      const value = item[searchField] as unknown as string;
      return value.toLowerCase().includes(lowerQuery);
    });
  }, [query, items, searchField]);

  return {
    query,
    setQuery,
    filteredItems,
  };
}
