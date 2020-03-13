import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import UpdateForm from "../updateForm";
import codeSendService from "utils/api/codeSendService";
import { Update } from "interfaces/Update";
import initMatchMedia from "matchMedia.mock";
import { RootState } from "stores/types";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const mockUpdate: Update = {
  _id: "mock id",
  version: "mock version",
  note: "mock note",
  createdAt: "mock created at",
  updatedAt: "mock updated at",
  bundleUrl: "mock bundle url"
};
const file = new File(["mock content"], "index.bundle.js");

const renderUpdateForm = (initialState?: Partial<RootState>) => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider initialState={initialState}>
        <UpdateForm />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("update form", () => {
  it("can show create success message", async () => {
    const { findByText, getByLabelText, getByText } = renderUpdateForm();

    const inputVersionElement = getByLabelText("Version");
    const inputNoteElement = getByLabelText("Note");
    const inputBundleElement = getByLabelText("Bundle");
    const submitElement = getByText("Submit").closest("button");

    const { version, note } = mockUpdate;
    codeSendServiceMock.createUpdate.mockResolvedValueOnce(mockUpdate);
    codeSendServiceMock.uploadUpdate.mockResolvedValueOnce(mockUpdate);
    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show create failed message", async () => {
    const { findByText, getByLabelText, getByText } = renderUpdateForm();
    const inputVersionElement = getByLabelText("Version");
    const inputNoteElement = getByLabelText("Note");
    const inputBundleElement = getByLabelText("Bundle");
    const submitElement = getByText("Submit").closest("button");

    codeSendServiceMock.createUpdate.mockRejectedValueOnce({
      status: "error",
      message: "failed to create update"
    });

    const { version, note } = mockUpdate;
    fireEvent.change(inputVersionElement, { target: { value: version } });
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.change(inputBundleElement, { target: { files: [file] } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show edit success message", async () => {
    const { getByLabelText, getByText, findByText } = renderUpdateForm({
      update: {
        items: [],
        loading: false,
        selected: mockUpdate
      }
    });

    const inputNoteElement = getByLabelText("Note");
    const submitElement = getByText("Submit").closest("button");

    const { note } = mockUpdate;
    codeSendServiceMock.editUpdate.mockResolvedValueOnce(mockUpdate);
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show edit failed message", async () => {
    const { findByText, getByLabelText, getByText } = renderUpdateForm({
      update: {
        items: [],
        loading: false,
        selected: mockUpdate
      }
    });
    const inputNoteElement = getByLabelText("Note");
    const submitElement = getByText("Submit").closest("button");

    codeSendServiceMock.editUpdate.mockRejectedValueOnce({
      status: "error",
      message: "failed to edit update"
    });

    const { note } = mockUpdate;
    fireEvent.change(inputNoteElement, { target: { value: note } });
    fireEvent.click(submitElement!);

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
