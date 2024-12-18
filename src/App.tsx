import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./components/home";
import { Navbar } from "./components/navbar";
import { Category } from "./components/category";
import { NotFound } from "./components/not-found";
import { CategoryDetail } from "./components/category-detail";

export function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/:category/:id" element={<CategoryDetail />} />
        </Routes>
      </div>
    </>
  );
}
