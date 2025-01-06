import { ThemeProvider } from "@mui/material";
import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRoutes } from "./routes";
import { theme } from "../shared/config/theme";

import "../registerServiceWorker";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
