import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, expect, it } from "vitest";

describe("App component", () => {
  it("renderiza o Dashboard na rota /", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getByText("Frontend React Test")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renderiza MoviesList na rota /movies", () => {
    window.history.pushState({}, "", "/movies");
    render(<App />);
    expect(screen.getByText("List Movies")).toBeInTheDocument();
  });
});
