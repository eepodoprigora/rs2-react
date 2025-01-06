import React from "react";
import { Note } from "../model/Note";
import { formatTime } from "../../../shared/utils";
import { parseNoteContent } from "../../../shared/utils/noteParser";
import { Box, Typography } from "@mui/material";

interface NoteListItemProps {
  note: Note;
  onSelect: (id: string) => void;
  selected: boolean;
}

export const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  onSelect,
  selected,
}) => {
  const handleSelect = () => {
    if (note.id) {
      onSelect(note.id);
    }
  };

  const { title, description } = parseNoteContent(note.content);

  return (
    <Box
      onClick={handleSelect}
      sx={{
        borderRadius: "8px",
        marginBottom: "5px",
        backgroundColor: selected ? "#ffeb3b" : "transparent", // Highlight selected note with yellow
        cursor: "pointer",
        boxShadow: selected ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}>
      <Box
        sx={{
          flex: 1,
          borderBottom: selected ? "none" : "1px solid #ccc",
          padding: "12px",
        }}>
        <Typography
          variant="h6"
          sx={{
            margin: 0,
            fontSize: "16px",
            color: selected ? "#333" : "#555",
            fontWeight: selected ? "bold" : "normal",
          }}>
          {title.length > 0 ? title : "Новая заметка"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "#777",
          }}>
          <Typography>{formatTime(note.updatedAt)}</Typography>
          <Typography
            sx={{
              margin: 0,
              color: "#555",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "80%",
            }}>
            {description.length > 0
              ? description.slice(0, 40)
              : "Нет дополнительного текста"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
