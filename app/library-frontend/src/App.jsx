import { useState } from "react";
import "./styles/layout.css";

import Dashboard from "./pages/Dashboard";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import StatsPage from "./pages/StatsPage";

function App() {

  const [view, setView] = useState("dashboard");

  return (
    <div className="app-container">

      <h1 className="title">Library Management System</h1>

      <div className="navbar">

        <button onClick={() => setView("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setView("books")}>
          Books
        </button>

        <button onClick={() => setView("authors")}>
          Authors
        </button>

        <button onClick={() => setView("stats")}>
          Stats
        </button>

      </div>

      <div className="content">

        {view === "dashboard" && <Dashboard />}

        {view === "books" && <BooksPage />}

        {view === "authors" && <AuthorsPage />}

        {view === "stats" && <StatsPage />}

      </div>

    </div>
  );
}

export default App;