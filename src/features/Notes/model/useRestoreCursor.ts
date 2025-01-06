import { useEffect } from "react";

export const useRestoreCursor = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  cursorPosition: number
) => {
  useEffect(() => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = cursorPosition;
        textareaRef.current.selectionEnd = cursorPosition;
        textareaRef.current.focus();
      }
    }, 0);
  }, [cursorPosition, textareaRef]);
};
