import { Modal, Box, Typography, Button } from "@mui/material";

interface DeleteNoteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  removeNote: (id: string) => Promise<void>;
  selectedNoteId: string;
}

export const DeleteNoteConfirmModal: React.FC<DeleteNoteConfirmModalProps> = ({
  isOpen,
  onClose,
  removeNote,
  selectedNoteId,
}) => {
  const handleDelete = async () => {
    removeNote(selectedNoteId);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          width: 400,
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          border: "1px solid #ddd",
        }}>
        <Typography
          id="modal-title"
          variant="h6"
          sx={{ fontWeight: "bold", color: "#333" }}>
          Подтвердите удаление
        </Typography>
        <Typography sx={{ mt: 2, color: "#555" }}>
          Вы уверены, что хотите удалить эту заметку? Это действие необратимо.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            onClick={onClose}
            sx={{
              mr: 2,
              bgcolor: "#f1f1f1",
              color: "#333",
              "&:hover": {
                bgcolor: "#e0e0e0",
              },
            }}>
            Отмена
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              bgcolor: "red",
              color: "#fff",
              "&:hover": {
                bgcolor: "#d32f2f",
              },
            }}>
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
