import { useCallback, useRef } from "react";
import { Note } from "../../../entities/Note";

export const useDebouncedSave = (
  onSave: (note: Note) => void,
  delay: number = 500
) => {
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedSave = useCallback(
    (note: Note) => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      saveTimeout.current = setTimeout(() => {
        onSave(note);
      }, delay);
    },
    [onSave, delay]
  );

  return debouncedSave;
};
