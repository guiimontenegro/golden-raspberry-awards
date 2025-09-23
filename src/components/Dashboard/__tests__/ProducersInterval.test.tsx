import { render, screen, within } from "@testing-library/react";
import ProducersInterval from "../panels/ProducersInterval";
import { describe, it, expect } from "vitest";

const mockInterval = {
  max: [
    { producer: "Producer Max", interval: 10, previousWin: 1990, followingWin: 2000 },
  ],
  min: [
    { producer: "Producer Min", interval: 1, previousWin: 2000, followingWin: 2001 },
  ],
};

describe("ProducersInterval", () => {
  it("renderiza títulos corretamente", () => {
    render(<ProducersInterval interval={{ min: [], max: [] }} />);
    expect(screen.getByText("Producers with longest and shortest interval between wins")).toBeInTheDocument();
    expect(screen.getByText("Maximum")).toBeInTheDocument();
    expect(screen.getByText("Minimum")).toBeInTheDocument();
  });

  it("renderiza dados máximos corretamente", () => {
    render(<ProducersInterval interval={mockInterval} />);

    const maximumPanel = screen.getByText("Maximum").closest("div")!;
    
    expect(within(maximumPanel).getByText("Producer Max")).toBeInTheDocument();
    expect(within(maximumPanel).getByText("10")).toBeInTheDocument();
    expect(within(maximumPanel).getByText("1990")).toBeInTheDocument();
    expect(within(maximumPanel).getByText("2000")).toBeInTheDocument();
  });

  it("renderiza dados mínimos corretamente", () => {
    render(<ProducersInterval interval={mockInterval} />);

    const minimumPanel = screen.getByText("Minimum").closest("div")!;
    
    expect(within(minimumPanel).getByText("Producer Min")).toBeInTheDocument();
    expect(within(minimumPanel).getByText("1")).toBeInTheDocument();
    expect(within(minimumPanel).getByText("2000")).toBeInTheDocument();
    expect(within(minimumPanel).getByText("2001")).toBeInTheDocument();
  });

  it("funciona com arrays vazios sem quebrar", () => {
    render(<ProducersInterval interval={{ min: [], max: [] }} />);
    expect(screen.getByText("Maximum")).toBeInTheDocument();
    expect(screen.getByText("Minimum")).toBeInTheDocument();
  });
});
