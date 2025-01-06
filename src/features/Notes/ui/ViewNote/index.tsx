import React from "react";
import Markdown from "marked-react";
import { Note } from "../../../../entities/Note";
import { IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction } from "react";

interface ViewNoteProps {
  note: Note;
  startEditing: (id: string) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ViewNote: React.FC<ViewNoteProps> = ({
  note,
  startEditing,
  setIsModalOpen,
}) => {
  return (
    <Box
      sx={{
        padding: "59px 20px 20px 29px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
        margin: "0 auto",
        position: "relative",
      }}>
      <Box sx={{ marginBottom: 3 }}>
        <Markdown>{note.content}</Markdown>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
        }}>
        <IconButton
          onClick={() => startEditing(note.id)}
          sx={{
            padding: 1,
            color: "#FFC107",
            "&:hover": {
              backgroundColor: "#FFE082",
            },
          }}>
          <EditIcon />
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
