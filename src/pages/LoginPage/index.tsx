import { FormEvent, useState } from "react";
import { TextField, IconButton, Card, Typography, Box } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useAuth } from "../../features/AuthByPassword/model/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/notes";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string | null;

    if (username && username.trim()) {
      auth?.signin(username, () => {
        navigate(from, { replace: true });
      });
      setError("");
    } else {
      setError("Имя пользователя обязательно");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}>
      <Card
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%",
        }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            marginBottom: 3,
            textAlign: "center",
            fontWeight: 600,
          }}>
          Добро пожаловать
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!error}
            sx={{ marginBottom: 2 }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "error.main",
              height: "20px",
              marginBottom: 2,
              textAlign: "center",
              opacity: error ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}>
            {error}
          </Typography>

          <Box display="flex" justifyContent="center">
            <IconButton
              type="submit"
              size="large"
              sx={{
                color: "#FFC107",
                "&:hover": {
                  backgroundColor: "#FFE082",
                },
              }}>
              <LoginRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default LoginPage;
