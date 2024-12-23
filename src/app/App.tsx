import { Suspense } from "react";

import { AuthProvider } from "./providers/auth-provider";
import { Navbar } from "../shared/components/Navbar";
import { AuthStatus } from "../entities/auth/ui";
import ErrorBoundary from "../shared/components/ErrorBoundary";
import { Routing } from "./routes";

import "./App.css";

function App() {
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
              <Routing />
            </Suspense>
          </ErrorBoundary>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
