import { Box, Card, Typography, Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/AuthByPassword/model";

const ErrorPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleRoute = () => {
    let redirectPath;
    if (auth?.user) {
      redirectPath = "/notes";
    } else {
      redirectPath = "/";
    }

    navigate(redirectPath);
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
          textAlign: "center",
        }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ marginBottom: 2, fontWeight: 600 }}>
          Что-то пошло не так...
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Не удалось загрузить страницу. Возможно, вы попали сюда по ошибке.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeRoundedIcon />}
          onClick={handleRoute}
          sx={{
            padding: "8px 16px",
            borderRadius: 2,
            textTransform: "none",
            fontSize: "16px",
          }}>
          На главную
        </Button>
      </Card>
    </Box>
  );
};

export default ErrorPage;
