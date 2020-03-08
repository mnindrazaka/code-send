import React from "react";
import { render } from "@testing-library/react";
import "matchMedia.mock";
import { MemoryRouter } from "react-router-dom";
import Page from "../page";
import codeSendService from "utils/api/codeSendService";
import { ProjectProvider } from "contexts/projectContext";
import { UpdateProvider } from "contexts/updateContext";

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const renderDashboardPage = () => {
  const utils = render(
    <MemoryRouter>
      <ProjectProvider>
        <UpdateProvider>
          <Page />
        </UpdateProvider>
      </ProjectProvider>
    </MemoryRouter>
  );

  return utils;
};

describe("dashboard page", () => {
  it("can render correct version", async () => {
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce({
      version: "0.1",
      note: "latest update"
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
