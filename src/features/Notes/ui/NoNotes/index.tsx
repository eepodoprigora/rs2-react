import { Card, Typography, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

interface NoNotesProps {
  onAddNote: () => void;
}

export const NoNotes: React.FC<NoNotesProps> = ({ onAddNote }) => {
  return (
    <Card
      sx={{
        padding: 4,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}>
      <Typography
        variant="h6"
        component="p"
        sx={{ marginBottom: 2, fontWeight: 500 }}>
        Пока заметок нет
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 3 }}>
        Добавьте первую заметку, чтобы начать.
      </Typography>
      <IconButton
        color="primary"
        size="large"
        onClick={onAddNote}
        sx={{ padding: "12px" }}>
        <AddCircleRoundedIcon sx={{ fontSize: "36px" }} />
      </IconButton>
    </Card>
  );
};
