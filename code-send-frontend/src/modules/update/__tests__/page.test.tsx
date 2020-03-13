import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Page from "../page";
import initMatchMedia from "matchMedia.mock";
import { StoreProvider } from "stores";
import codeSendService from "utils/api/codeSendService";
import { Update } from "interfaces/Update";

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

const renderUpdatePage = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider>
        <Page />
      </StoreProvider>
    </MemoryRouter>
  );

  return utils;
};

describe("update page", () => {
  it("can show update log by default", async () => {
    codeSendServiceMock.getAllUpdates.mockResolvedValueOnce([mockUpdate]);
    const { findByText } = renderUpdatePage();
    const updateLogElement = await findByText("Update Logs");
    expect(updateLogElement).toBeInTheDocument();
  });

  it("can move to update create", async () => {
    codeSendServiceMock.getAllUpdates.mockResolvedValueOnce([mockUpdate]);
    const { findByText } = renderUpdatePage();
    const createButtonElement = (await findByText("Create New Update")).closest(
      "button"
    )!;
    fireEvent.click(createButtonElement);

    const updateFormElement = await findByText("Create Update");
    expect(updateFormElement).toBeInTheDocument();
  });

  it("can move to update edit", async () => {
    codeSendServiceMock.getAllUpdates.mockResolvedValueOnce([mockUpdate]);
    const { findByText } = renderUpdatePage();
    const editButtonElement = (await findByText("Edit")).closest("button")!;
    fireEvent.click(editButtonElement);

    const updateFormElement = await findByText("Edit Update");
    expect(updateFormElement).toBeInTheDocument();
  });
});
