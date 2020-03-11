import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Page from "../page";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

const renderUpdatePage = () => {
  const history = createMemoryHistory();
  const utils = render(
    <Router history={history}>
      <Page />
    </Router>
  );

  return {
    history,
    ...utils
  };
};

describe("update page", () => {
  it("can move to update log", async () => {
    const { history, findByTestId } = renderUpdatePage();
    history.push("/update/log");
    const updateLogElement = await findByTestId("page-update-log");
    expect(updateLogElement).toBeInTheDocument();
  });

  it("can move to update create", async () => {
    const { history, findByTestId } = renderUpdatePage();
    history.push("/update/create");
    const updateFormElement = await findByTestId("page-update-form");
    expect(updateFormElement).toBeInTheDocument();
  });
});
