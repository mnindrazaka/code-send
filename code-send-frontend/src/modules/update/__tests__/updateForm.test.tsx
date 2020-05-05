import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
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
  _id: "54a5f44a44fsf33a",
  version: "0.1",
  note: "first update",
  createdAt: "2020-03-29T21:59:47.213Z",
  updatedAt: "2020-03-29T21:59:47.213Z",
  bundleUrl: "https://bundle.com/download"
};
const file = new File(["mock content"], "index.bundle.js");
const renderUpdateForm = (initialState?: Partial<RootState>) => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider
        initialState={{
          ...initialState,
          auth: { username: "mnindrazaka", loading: false }
        }}
      >
        <UpdateForm />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("update form", () => {
  it("can show create global update success message", async () => {
    const { findByText, getByLabelText, getByText } = renderUpdateForm();
    const inputVersionElement = getByLabelText("Version");
    const inputNoteElement = getByLabelText("Note");
    const inputBundleElement = getByLabelText("Bundle");
    const submitElement = getByText("Submit").closest("button");

    const { version, note } = mockUpdate;
    codeSendServiceMock.createUpdate.mockResolvedValueOnce(mockUpdate);
    codeSendServiceMock.uploadUpdate.mockResolvedValueOnce(mockUpdate);

    await act(async () => {
      fireEvent.change(inputVersionElement, { target: { value: version } });
    });
    await act(async () => {
      fireEvent.change(inputNoteElement, { target: { value: note } });
    });
    await act(async () => {
      fireEvent.change(inputBundleElement, { target: { files: [file] } });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show input location if checkbox is checked", async () => {
    const { findByLabelText, getByLabelText } = renderUpdateForm();
    const checkboxRegionalElement = getByLabelText(
      "Release update only on particular location"
    );
    await act(async () => {
      fireEvent.click(checkboxRegionalElement);
    });
    const inputLocationElement = await findByLabelText("Location");
    expect(inputLocationElement).toBeInTheDocument();
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

    await act(async () => {
      fireEvent.change(inputVersionElement, { target: { value: version } });
    });
    await act(async () => {
      fireEvent.change(inputNoteElement, { target: { value: note } });
    });
    await act(async () => {
      fireEvent.change(inputBundleElement, { target: { files: [file] } });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

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
    codeSendServiceMock.editUpdate.mockResolvedValueOnce(mockUpdate);
    const { note } = mockUpdate;

    await act(async () => {
      fireEvent.change(inputNoteElement, { target: { value: note } });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

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

    await act(async () => {
      fireEvent.change(inputNoteElement, { target: { value: note } });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
