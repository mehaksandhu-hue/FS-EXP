import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Social Media Post Scheduler", () => {
  it("renders the scheduler heading", () => {
    render(<App />);

    expect(
      screen.getByText("📅 Social Media Post Scheduler")
    ).toBeInTheDocument();
  });

  it("renders scheduled posts", () => {
    render(<App />);

    expect(screen.getByText("Instagram Post")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn Post")).toBeInTheDocument();
  });
});