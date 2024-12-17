import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { SignIn } from "./components/signIn";
import { SignUp } from "./components/signUp";
import { Header } from "./components/headerr";
import { SignInFormData, SignUpFormData } from "./types";

export function Forms() {
  const onSubmit = (data: SignInFormData | SignUpFormData) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<SignIn onSubmit={(data) => onSubmit(data)} />}
            />
            <Route
              path="/signup"
              element={<SignUp onSubmit={(data) => onSubmit(data)} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}
