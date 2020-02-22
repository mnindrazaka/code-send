import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateLog from "../updateLog";

const renderUpdateLog = () => {
  const utils = render(
    <MemoryRouter>
      <UpdateLog />
    </MemoryRouter>
  );

  return utils;
};

describe("update log", () => {
  it("can render correctly", async () => {
    const { container } = renderUpdateLog();
    expect(container).toBeInTheDocument();
  });
});
