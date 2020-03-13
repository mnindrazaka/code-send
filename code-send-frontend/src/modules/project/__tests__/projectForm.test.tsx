import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import ProjectForm from "../projectForm";
import codeSendService from "utils/api/codeSendService";
import { Project } from "interfaces/Project";
import initMatchMedia from "matchMedia.mock";
import { RootState } from "stores/types";

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

const renderProjectForm = (initialState?: Partial<RootState>) => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider initialState={initialState}>
        <ProjectForm />
      </StoreProvider>
    </MemoryRouter>
  );
  const { getByLabelText, getByText } = utils;

  const inputNameElement = getByLabelText("Name");
  const submitElement = getByText("Submit").closest("button");

  return {
    ...utils,
    inputNameElement,
    submitElement
  };
};

describe("project form", () => {
  it("can fill correct value", () => {
    const { inputNameElement } = renderProjectForm();
    fireEvent.change(inputNameElement, { target: { value: mockProject.name } });
    expect(inputNameElement).toHaveValue(mockProject.name);
  });

  it("can show success message", async () => {
    const { inputNameElement, submitElement, findByText } = renderProjectForm();

    codeSendServiceMock.createProject.mockResolvedValueOnce(mockProject);
    fireEvent.change(inputNameElement, { target: { value: mockProject.name } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show failed message", async () => {
    const { inputNameElement, submitElement, findByText } = renderProjectForm();

    codeSendServiceMock.createProject.mockRejectedValueOnce({
      status: "error",
      message: "failed to create update"
    });
    fireEvent.change(inputNameElement, { target: { value: mockProject.name } });
    fireEvent.click(submitElement!);
    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });

  it("can edit project", async () => {
    const { inputNameElement, submitElement, findByText } = renderProjectForm({
      project: {
        items: [],
        loading: false,
        selected: mockProject
      }
    });

    codeSendServiceMock.createProject.mockResolvedValueOnce(mockProject);
    fireEvent.change(inputNameElement, { target: { value: mockProject.name } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });
});
