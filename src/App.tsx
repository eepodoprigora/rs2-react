import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.css";
import { Navbar } from "./components/navbar";
import { NotFound } from "./pages/not-found";

import { AuthProvider } from "./context/auth-provider";
import { AuthStatus } from "./components/auth-status";

import { PrivateRoute } from "./components/private-route";
import ErrorBoundary from "./components/error-boundary";

const Home = lazy(() => import("./pages/home"));
const Category = lazy(() => import("./pages/category"));
const CategoryDetail = lazy(() => import("./pages/category-detail"));
const Login = lazy(() => import("./pages/login"));

export function App() {
  return (
    <>
      <AuthProvider>
        <header className="header">
          <Navbar />
          <AuthStatus />
        </header>

        <div className="container">
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
          </ErrorBoundary>
        </div>
      </AuthProvider>
    </>
  );
}
