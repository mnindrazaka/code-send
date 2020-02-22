import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateForm from "../updateForm";
import codeSendService from "utils/api/codeSendService";

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const { getByLabelText, getByText, findByText } = render(
  <MemoryRouter>
    <UpdateForm />
  </MemoryRouter>
);

describe("update form", () => {
  const inputVersionElement = getByLabelText("Version");
  const inputNoteElement = getByLabelText("Note");
  const inputBundleElement = getByLabelText("Bundle");
  const submitElement = getByText("Submit");

  const _id = "mock id";
  const version = "mock version";
  const note = "mock note";
  const file = new File(["mock content"], "index.bundle.js");

  it("can fill correct value", () => {
    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });

    expect(inputVersionElement).toHaveValue(version);
    expect(inputNoteElement).toHaveValue(note);
  });

  it("can show success message", async () => {
    codeSendServiceMock.createUpdate.mockResolvedValueOnce({ _id });

    fireEvent.click(submitElement);
    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  // it("can hide message", async () => {
  //   const confirmButton = await findByText("OK");
  //   expect(confirmButton).toBeInTheDocument();
  //   confirmButton.click();
  //   expect(confirmButton).not.toBeInTheDOM();
  // });

  // it("can show failed message", async () => {
  //   codeSendServiceMock.createUpdate.mockRejectedValue({
  //     status: "error",
  //     message: "failed to update"
  //   });

  //   fireEvent.click(submitElement);
  //   const alertElement = await findByText("Failed");
  //   expect(alertElement).toBeInTheDocument();
  // });
});
