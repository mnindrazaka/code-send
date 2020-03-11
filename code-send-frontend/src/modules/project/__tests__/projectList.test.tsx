import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import ProjectList from "../projectList";
import codeSendService from "utils/api/codeSendService";
import { Project } from "interfaces/Project";

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const renderProjectList = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider>
        <ProjectList />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

const mockProject: Project = {
  _id: "mock id",
  createdAt: "mock created at",
  updatedAt: "mock updated at",
  name: "mock name"
};

describe("project list", () => {
  it("can render correct row count", async () => {
    codeSendServiceMock.getallProjects.mockResolvedValueOnce([
      mockProject,
      mockProject,
      mockProject
    ]);
    const { findAllByText } = renderProjectList();
    const cardElements = await findAllByText(mockProject.name);

    cardElements.forEach(cardElement => {
      fireEvent.click(cardElement);
    });

    expect(cardElements.length).toEqual(3);
  });

  it("can show failed message", async () => {
    codeSendServiceMock.getallProjects.mockRejectedValueOnce({
      status: "error",
      message: "failed to get update"
    });

    const { findByText } = renderProjectList();
    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
