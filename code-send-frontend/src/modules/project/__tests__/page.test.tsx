import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Page from "../page";
import initMatchMedia from "matchMedia.mock";
import codeSendService from "utils/api/codeSendService";
import { Project } from "interfaces/Project";
import { StoreProvider } from "stores";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const mockProject: Project = {
  _id: "mock id",
  createdAt: "mock created at",
  updatedAt: "mock updated at",
  name: "mock name"
};

const renderProjectPage = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider>
        <Page />
      </StoreProvider>
    </MemoryRouter>
  );

  return utils;
};

describe("project page", () => {
  it("can show project list by default", async () => {
    codeSendServiceMock.getallProjects.mockResolvedValueOnce([mockProject]);
    const { findByText } = renderProjectPage();
    const projectListElement = await findByText("Projects");
    expect(projectListElement).toBeInTheDocument();
  });

  it("can move to project create", async () => {
    codeSendServiceMock.getallProjects.mockResolvedValueOnce([mockProject]);
    const { findByText } = renderProjectPage();
    const createButtonElement = (
      await findByText("Create New Project")
    ).closest("button")!;
    fireEvent.click(createButtonElement);
    const projectFormElement = await findByText("Create Project");
    expect(projectFormElement).toBeInTheDocument();
  });

  it("can move to project edit", async () => {
    codeSendServiceMock.getallProjects.mockResolvedValueOnce([mockProject]);
    const { findByTitle, findByText } = renderProjectPage();
    const editButtonElement = await findByTitle("Edit Project");
    fireEvent.click(editButtonElement);
    const projectFormElement = await findByText("Edit Project");
    expect(projectFormElement).toBeInTheDocument();
  });
});
