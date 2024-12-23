import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../entities/user/ui/PrivateRoute";

const Home = lazy(() => import("../../pages/HomePage"));
const Category = lazy(() => import("../../pages/CategoryPage"));
const CategoryDetail = lazy(() => import("../../pages/CategoryDetailPage"));
const Login = lazy(() => import("../../pages/LoginPage"));
const NotFound = lazy(() => import("../../pages/NotFoundPage"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/:category"
        element={
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        }
      />
      <Route
        path="/:category/:id"
        element={
          <PrivateRoute>
            <CategoryDetail />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
