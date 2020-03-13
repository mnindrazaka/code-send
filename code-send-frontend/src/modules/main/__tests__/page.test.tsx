import React, { ChangeEvent } from "react";
import { render, fireEvent } from "@testing-library/react";
import Page from "../page";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import initMatchMedia from "matchMedia.mock";
import { StoreProvider } from "stores";
import { SelectProps } from "antd/lib/select";
import { Select } from "antd";

initMatchMedia();

jest.mock(
  "antd/lib/select",
  () => ({ placeholder, onChange }: SelectProps<string>) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(event.target.value, []);
    };

    return (
      <select
        onChange={handleChange}
        placeholder={placeholder as string}
      ></select>
    );
  }
);

const renderMainPage = () => {
  const mockProject = {
    _id: "mock id",
    createdAt: "mock created at",
    updatedAt: "mock updated at",
    name: "mock name"
  };
  const mockProjectState = {
    items: [mockProject],
    loading: false,
    selected: mockProject
  };

  const history = createMemoryHistory();
  const utils = render(
    <Router history={history}>
      <StoreProvider initialState={{ project: mockProjectState }}>
        <Page />
      </StoreProvider>
    </Router>
  );

  return {
    history,
    ...utils
  };
};

describe("main", () => {
  it("can move to dashboard page", async () => {
    const { history, findByText } = renderMainPage();
    history.push("/dashboard");
    const pageElement = await findByText("Latest Update");
    expect(pageElement).toBeInTheDocument();
  });

  it("can move to update page", async () => {
    const { history, findByText } = renderMainPage();
    history.push("/update");
    const pageElement = await findByText("Update Logs");
    expect(pageElement).toBeInTheDocument();
  });

  it("can change project", async () => {
    const { findByPlaceholderText } = renderMainPage();

    const projectSelectorElement = await findByPlaceholderText(
      "Select Project"
    );

    fireEvent.change(projectSelectorElement, {
      target: { value: "mock id" }
    });

    expect(projectSelectorElement).toBeInTheDocument();
  });
});
