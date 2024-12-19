import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./components/home";
import { Navbar } from "./components/navbar";
import { Category } from "./components/category";
import { NotFound } from "./components/not-found";
import { CategoryDetail } from "./components/category-detail";
import { AuthProvider } from "./context/auth-provider";
import { AuthStatus } from "./components/auth-status";
import { Login } from "./components/login";
import { PrivateRoute } from "./components/private-route";

export function App() {
  return (
    <>
      <AuthProvider>
        <header className="header">
          <Navbar />
          <AuthStatus />
        </header>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/:category"
              element={
                <PrivateRoute>
                  <Category />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/:category/:id"
              element={
                <PrivateRoute>
                  <CategoryDetail />{" "}
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}
