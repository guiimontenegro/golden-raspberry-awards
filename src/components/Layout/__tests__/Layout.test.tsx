import { render, screen } from "@testing-library/react";
import Layout from "../Layout";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Layout component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Some text inside Layout</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByText("Some text inside Layout")).toBeInTheDocument();
  });
});
