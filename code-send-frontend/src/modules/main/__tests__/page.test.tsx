import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Page from "../page";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import initMatchMedia from "matchMedia.mock";
import { StoreProvider } from "stores";

initMatchMedia();

const renderMainPage = () => {
  const mockProject = {
    _id: "656a6ge554e5egyhha5",
    createdAt: "2020-03-29T21:59:47.213Z",
    updatedAt: "2020-03-29T21:59:47.213Z",
    name: "awesome project"
  };
  const mockProject2 = {
    _id: "5462642672572y526525",
    createdAt: "2020-03-29T21:59:47.213Z",
    updatedAt: "2020-03-29T21:59:47.213Z",
    name: "awesome project 2"
  };
  const mockProjectState = {
    items: [mockProject, mockProject2],
    loading: false,
    selected: mockProject
  };

  const history = createMemoryHistory();
  const utils = render(
    <Router history={history}>
      <StoreProvider
        initialState={{
          project: mockProjectState,
          auth: { username: "mnindrazaka", loading: false }
        }}
      >
        <Page />
      </StoreProvider>
    </Router>
  );

  return {
    mockProject,
    mockProject2,
    history,
    ...utils
  };
};

describe("main", () => {
  it("can move to dashboard page", async () => {
    const { history, findByText, mockProject } = renderMainPage();
    history.push("/dashboard");
    const pageSubTitleElement = await findByText(mockProject._id);
    expect(pageSubTitleElement).toBeInTheDocument();
  });

  it("can move to update page", async () => {
    const { history, findByText } = renderMainPage();
    history.push("/update");
    const pageElement = await findByText("Update Logs");
    expect(pageElement).toBeInTheDocument();
  });

  it("can change project", async () => {
    const { findByRole, findByText, mockProject2 } = renderMainPage();
    const projectSelectorElement = await findByRole("combobox");
    act(() => {
      fireEvent.change(projectSelectorElement, {
        target: { value: mockProject2._id }
      });
    });
    const pageSubTitleElement = await findByText(mockProject2._id);
    expect(pageSubTitleElement).toBeInTheDocument();
  });
});
