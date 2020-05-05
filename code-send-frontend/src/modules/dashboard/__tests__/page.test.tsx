import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import Page from "../page";
import codeSendService from "utils/api/codeSendService";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const renderDashboardPage = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider
        initialState={{ auth: { username: "mnindrazaka", loading: false } }}
      >
        <Page />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("dashboard page", () => {
  it("can render correct version", async () => {
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce({
      _id: "524a2sd4d2d2h88a54",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "2020-03-29T21:59:47.213Z",
      version: "0.1",
      note: "first update",
      bundleUrl: "https://bundle.com/download"
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
