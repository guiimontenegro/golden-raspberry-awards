import { it, beforeEach } from "vitest";
beforeEach(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

it("should render App to root", async () => {
  await import("../index.tsx");
});
