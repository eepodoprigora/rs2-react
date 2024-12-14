import { useCallback, useState } from "react";

import {
  LocalStorageSetValue,
  LocalStorageReturnValue,
  UseLocalStorage,
} from "./types";

export function useLocalStorage(
  key: LocalStorageSetValue
): ReturnType<UseLocalStorage> {
  const [storedValue, setStoredValue] = useState<LocalStorageReturnValue>(
    () => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? item : null;
      } catch (e) {
        console.error("Ошибка при чтении из localStorage", e);
        return null;
      }
    }
  );

  const setItem = useCallback(
    (value: LocalStorageSetValue) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, value);
      } catch (e) {
        console.error("Ошибка при записи в localStorage", e);
      }
    },
    [key]
  );

  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (e) {
      console.error("Ошибка при удалении из localStorage", e);
    }
  }, [key]);

  return [storedValue, { setItem, removeItem }];
}
