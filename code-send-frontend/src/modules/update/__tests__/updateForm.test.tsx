import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateForm from "../updateForm";
import codeSendService from "utils/api/codeSendService";

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
      <UpdateForm />
    </MemoryRouter>
  );
  const { getByLabelText, getByText } = utils;

  const inputVersionElement = getByLabelText("Version");
  const inputNoteElement = getByLabelText("Note");
  const inputBundleElement = getByLabelText("Bundle");
  const submitElement = getByText("Submit");

  fireEvent.change(inputVersionElement, { target: { value: version } });
  fireEvent.change(inputNoteElement, { target: { value: note } });
  fireEvent.change(inputBundleElement, { target: { files: [file] } });

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
    const { inputVersionElement, inputNoteElement } = renderUpdateForm();
    expect(inputVersionElement).toHaveValue(version);
    expect(inputNoteElement).toHaveValue(note);
  });

  it("can show success message", async () => {
    const { submitElement, findByText } = renderUpdateForm();
    codeSendServiceMock.createUpdate.mockResolvedValueOnce({ _id });
    fireEvent.click(submitElement);
    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show failed message", async () => {
    const { submitElement, findByText } = renderUpdateForm();
    codeSendServiceMock.createUpdate.mockRejectedValueOnce({
      status: "error",
      message: "failed to create update"
    });

    fireEvent.click(submitElement);
    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
