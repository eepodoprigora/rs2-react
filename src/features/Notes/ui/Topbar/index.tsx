import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { SearchInput } from "../../../Search/ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthByPassword/model/useAuth";

interface TopbarProps {
  onAddNote: () => void;
  query: string;
  setQuery: (query: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onAddNote,
  query,
  setQuery,
}) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleLogout = () => {
    auth?.signout(() => {
      navigate("/");
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 12px 12px",
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={onAddNote}
              title="Добавить заметку"
              size="large"
              sx={{
                color: "#FFC107",
                "&:hover": {
                  backgroundColor: "#FFE082",
                },
              }}>
              {" "}
              <NoteAddRoundedIcon />
            </IconButton>
            <IconButton
              onClick={handleLogout}
              title="Выйти"
              size="large"
              sx={{
                color: "#FFC107",
                "&:hover": {
                  backgroundColor: "#FFE082",
                },
              }}>
              <LogoutRoundedIcon />
            </IconButton>
          </Box>
          <SearchInput value={query} onChange={handleSearchChange} />
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: "64px" }} />
    </>
  );
};
