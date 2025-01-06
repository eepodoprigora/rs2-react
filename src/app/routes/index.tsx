import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("../../pages/LoginPage"));
const NotesPage = lazy(() => import("../../pages/Notes"));
const ErrorPage = lazy(() => import("../../pages/ErrorPage"));

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/notes" element={<NotesPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
