import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Page from "../page";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

const renderProjectPage = () => {
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

describe("project page", () => {
  it("can move to project list", async () => {
    const { history, findByTestId } = renderProjectPage();
    history.push("/project/list");
    const projectListElement = await findByTestId("page-project-list");
    expect(projectListElement).toBeInTheDocument();
  });

  it("can move to project create", async () => {
    const { history, findByTestId } = renderProjectPage();
    history.push("/project/create");
    const projectFormElement = await findByTestId("page-project-form");
    expect(projectFormElement).toBeInTheDocument();
  });
});
