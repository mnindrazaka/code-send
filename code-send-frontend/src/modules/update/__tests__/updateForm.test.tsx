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

const { getByLabelText, getByText, findByTestId } = render(
  <MemoryRouter>
    <UpdateForm />
  </MemoryRouter>
);

describe("update form", () => {
  it("can submit form with correct value", async () => {
    const inputVersionElement = getByLabelText("Version");
    const inputNoteElement = getByLabelText("Note");
    const inputBundleElement = getByLabelText("Bundle");
    const submitElement = getByText("Submit");

    const _id = "mock id";
    const version = "mock version";
    const note = "mock note";
    const file = new File(["mock content"], "index.bundle.js");

    codeSendServiceMock.createUpdate.mockResolvedValueOnce({
      data: { _id },
      config: {},
      headers: {},
      status: 200,
      statusText: "ok"
    });

    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });
    fireEvent.click(submitElement);

    const loadingElement = await findByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
    expect(codeSendServiceMock.createUpdate).toBeCalledWith({ version, note });
    expect(codeSendServiceMock.uploadUpdate).toBeCalledWith(_id, file);
  });
});
