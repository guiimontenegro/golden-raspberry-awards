import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <header className="header">
        <h2>Frontend React Test</h2>
      </header>

      <div className="app-container">
        <nav className="sidebar">
          <Link to="/">Dashboard</Link>
          <Link to="/movies">List</Link>
        </nav>

        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
