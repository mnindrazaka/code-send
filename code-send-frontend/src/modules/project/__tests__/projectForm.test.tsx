import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
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
  _id: "52a4rw3a3rw4raw33",
  createdAt: "2020-03-29T21:59:47.213Z",
  updatedAt: "2020-03-29T21:59:47.213Z",
  name: "awesome project"
};

const renderProjectForm = (initialState?: Partial<RootState>) => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider
        initialState={{
          ...initialState,
          auth: { username: "mnindrazaka", loading: false }
        }}
      >
        <ProjectForm />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("project form", () => {
  it("can show create success message", async () => {
    const { getByPlaceholderText, getByText, findByText } = renderProjectForm();
    codeSendServiceMock.createProject.mockResolvedValueOnce(mockProject);

    const inputNameElement = getByPlaceholderText("Awesome App");
    const submitElement = getByText("Create Project Now").closest("button");

    await act(async () => {
      fireEvent.change(inputNameElement, {
        target: { value: mockProject.name }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show create failed message", async () => {
    const { getByPlaceholderText, getByText, findByText } = renderProjectForm();
    codeSendServiceMock.createProject.mockRejectedValueOnce({
      status: "error",
      message: "failed to create update"
    });

    const inputNameElement = getByPlaceholderText("Awesome App");
    const submitElement = getByText("Create Project Now").closest("button");

    await act(async () => {
      fireEvent.change(inputNameElement, {
        target: { value: mockProject.name }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show edit success message", async () => {
    const { getByPlaceholderText, getByText, findByText } = renderProjectForm({
      project: {
        items: [],
        loading: false,
        selected: mockProject
      }
    });

    codeSendServiceMock.editProject.mockResolvedValueOnce(mockProject);

    const inputNameElement = getByPlaceholderText("Awesome App");
    const submitElement = getByText("Edit Project Now").closest("button");

    await act(async () => {
      fireEvent.change(inputNameElement, {
        target: { value: mockProject.name }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show edit failed message", async () => {
    const { getByPlaceholderText, getByText, findByText } = renderProjectForm({
      project: {
        items: [],
        loading: false,
        selected: mockProject
      }
    });

    codeSendServiceMock.editProject.mockRejectedValueOnce({
      status: "error",
      message: "failed to edit update"
    });

    const inputNameElement = getByPlaceholderText("Awesome App");
    const submitElement = getByText("Edit Project Now").closest("button");

    await act(async () => {
      fireEvent.change(inputNameElement, {
        target: { value: mockProject.name }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
