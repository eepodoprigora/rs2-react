import React from "react";
import { Note, NoteListItem } from "../../../../entities/Note";
import { Box, Typography } from "@mui/material";

interface SidebarProps {
  notes: Note[];
  onSelect: (id: string) => void;
  selectedNoteId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  notes,
  onSelect,
  selectedNoteId,
}) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          fontWeight: 600,
          color: "#333",
        }}>
        Ваши заметки
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "3px",
          },
        }}>
        {notes.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            onSelect={onSelect}
            selected={selectedNoteId === note.id}
          />
        ))}
      </Box>
    </Box>
  );
};
