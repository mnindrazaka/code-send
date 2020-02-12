import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Page from "../page";

const history = createMemoryHistory();
const { findByTestId } = render(
  <Router history={history}>
    <Page />
  </Router>
);

describe("update page", () => {
  it("can move to update log", async () => {
    history.push("/update/log");
    const updateLogElement = await findByTestId("page-update-log");
    expect(updateLogElement).toBeInTheDocument();
  });

  it("can move to update create", async () => {
    history.push("/update/create");
    const updateFormElement = await findByTestId("page-update-form");
    expect(updateFormElement).toBeInTheDocument();
  });
});
