import React from "react";
import { render } from "@testing-library/react";
import "matchMedia.mock";
import Page from "../page";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const renderMainPage = () => {
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

describe("main", () => {
  it("can move to dashboard page", async () => {
    const { history, findByTestId } = renderMainPage();
    history.push("/dashboard");
    const pageElement = await findByTestId("page-dashboard");
    expect(pageElement).toBeInTheDocument();
  });

  it("can move to update page", async () => {
    const { history, findByTestId } = renderMainPage();
    history.push("/update");
    const pageElement = await findByTestId("page-update");
    expect(pageElement).toBeInTheDocument();
  });
});
