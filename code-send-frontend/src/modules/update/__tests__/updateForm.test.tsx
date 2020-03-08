import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "matchMedia.mock";
import { MemoryRouter } from "react-router-dom";
import UpdateForm from "../updateForm";
import codeSendService from "utils/api/codeSendService";
import { ProjectProvider } from "contexts/projectContext";
import { UpdateProvider } from "contexts/updateContext";

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const _id = "mock id";
const version = "mock version";
const note = "mock note";
const file = new File(["mock content"], "index.bundle.js");

const renderUpdateForm = () => {
  const utils = render(
    <MemoryRouter>
      <ProjectProvider>
        <UpdateProvider>
          <UpdateForm />
        </UpdateProvider>
      </ProjectProvider>
    </MemoryRouter>
  );
  const { getByLabelText, getByText } = utils;

  const inputVersionElement = getByLabelText("Version");
  const inputNoteElement = getByLabelText("Note");
  const inputBundleElement = getByLabelText("Bundle");
  const submitElement = getByText("Submit").closest("button");

  return {
    ...utils,
    inputVersionElement,
    inputNoteElement,
    inputBundleElement,
    submitElement
  };
};

describe("update form", () => {
  it("can fill correct value", () => {
    const {
      inputVersionElement,
      inputNoteElement,
      inputBundleElement
    } = renderUpdateForm();

    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });

    expect(inputVersionElement).toHaveValue(version);
    expect(inputNoteElement).toHaveValue(note);
  });

  it("can show success message", async () => {
    const {
      inputVersionElement,
      inputNoteElement,
      inputBundleElement,
      submitElement,
      findByText
    } = renderUpdateForm();

    codeSendServiceMock.createUpdate.mockResolvedValueOnce({ _id });
    codeSendServiceMock.uploadUpdate.mockResolvedValueOnce({ _id });
    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show failed message", async () => {
    const {
      inputVersionElement,
      inputNoteElement,
      inputBundleElement,
      submitElement,
      findByText
    } = renderUpdateForm();

    codeSendServiceMock.createUpdate.mockRejectedValueOnce({
      status: "error",
      message: "failed to create update"
    });
    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
