import React from "react";
import { render } from "@testing-library/react";
import "matchMedia.mock";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import Page from "../page";
import codeSendService from "utils/api/codeSendService";

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const renderDashboardPage = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider>
        <Page />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("dashboard page", () => {
  it("can render correct version", async () => {
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce({
      _id: "mock id",
      createdAt: "mock created at",
      updatedAt: "mock updated at",
      version: "0.1",
      note: "latest update",
      bundleUrl: "mock bundle url"
    });
    const { findByText } = renderDashboardPage();
    const versionTextElement = await findByText("0.1");
    expect(versionTextElement).toBeInTheDocument();
  });

  it("can show failed message", async () => {
    codeSendServiceMock.getLatestUpdate.mockRejectedValueOnce({
      status: "error",
      message: "failed to get update"
    });
    const { findByText } = renderDashboardPage();
    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
