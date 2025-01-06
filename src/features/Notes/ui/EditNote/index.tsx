import { useDebouncedSave, useRestoreCursor } from "../../model";
import { removeMarkdown } from "../../../../shared/utils";
import { IconButton, Box, TextareaAutosize } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Note } from "../../../../entities/Note";

interface EditNoteProps {
  note: Note;
  onSave: (updatedNote: Note) => Promise<void>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  stopEditing: (content: string, id: string) => void;
}

export const EditNote: React.FC<EditNoteProps> = ({
  note,
  stopEditing,
  onSave,
  setIsModalOpen,
}) => {
  const [content, setContent] = useState<string>(note.content || "");
  const [cursorPosition, setCursorPosition] = useState<number>(
    note.cursorPosition || 0
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (value: string) => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
      setContent(value);
      debouncedSave({
        ...note,
        content: removeMarkdown(value),
        cursorPosition,
      });
    }
  };
  useRestoreCursor(textareaRef, cursorPosition);
  const debouncedSave = useDebouncedSave(
    (updatedNote) => onSave(updatedNote),
    500
  );

  useEffect(() => {
    setContent(note.content);
    setCursorPosition(note.cursorPosition || 0);
  }, [note]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "50px 20px 20px 20px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        margin: "0 auto",
        position: "relative",
        height: "100%",
      }}>
      <TextareaAutosize
        ref={textareaRef}
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Введите заметку в формате Markdown"
        minRows={5}
        maxRows={10}
        style={{
          fontFamily: "inherit",
          padding: "8px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "none",
          marginBottom: "16px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
        }}>
        <IconButton
          onClick={() => stopEditing(content, note.id)}
          sx={{
            padding: 1,
            color: "#FFC107",
            "&:hover": {
              backgroundColor: "#FFE082",
            },
          }}>
          <SaveIcon />
        </IconButton>
        <IconButton
          onClick={() => setIsModalOpen(true)}
          sx={{
            padding: 1,
            color: "error.main",
            "&:hover": {
              backgroundColor: "#FFE082",
            },
          }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
