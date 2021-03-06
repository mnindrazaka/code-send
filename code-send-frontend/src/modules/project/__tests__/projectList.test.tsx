import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import ProjectList from "../projectList";
import codeSendService from "utils/api/codeSendService";
import { Project } from "interfaces/Project";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const renderProjectList = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider
        initialState={{ auth: { username: "mnindrazaka", loading: false } }}
      >
        <ProjectList />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

const mockProject: Project = {
  _id: "52a4af3f4ea3fa3",
  createdAt: "2020-03-29T21:59:47.213Z",
  updatedAt: "2020-03-29T21:59:47.213Z",
  name: "awesome project"
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
      act(() => {
        fireEvent.click(cardElement);
      });
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

  it("can show delete success message", async () => {
    codeSendServiceMock.getallProjects.mockResolvedValueOnce([mockProject]);
    codeSendServiceMock.deleteProject.mockResolvedValueOnce(mockProject);

    const { findByTitle, findByText } = renderProjectList();
    const deleteButtonElement = await findByTitle("Delete Project");
    await act(async () => {
      fireEvent.click(deleteButtonElement);
    });

    const yesButtonElement = await (await findByText("Yes")).closest("button")!;
    await act(async () => {
      fireEvent.click(yesButtonElement);
    });

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show delete failed message", async () => {
    codeSendServiceMock.getallProjects.mockResolvedValueOnce([mockProject]);
    codeSendServiceMock.deleteProject.mockRejectedValueOnce({
      status: "error",
      message: "failed to delete project"
    });
    const { findByTitle, findByText } = renderProjectList();

    const deleteButtonElement = await findByTitle("Delete Project");
    await act(async () => {
      fireEvent.click(deleteButtonElement);
    });

    const yesButtonElement = await (await findByText("Yes")).closest("button")!;
    await act(async () => {
      fireEvent.click(yesButtonElement);
    });

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
