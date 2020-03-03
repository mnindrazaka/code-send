import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateLog from "../updateLog";
import codeSendService from "utils/api/codeSendService";

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const renderUpdateLog = () => {
  const utils = render(
    <MemoryRouter>
      <UpdateLog />
    </MemoryRouter>
  );
  return utils;
};

describe("update log", () => {
  it("can render correct row count", async () => {
    codeSendServiceMock.getAllUpdates.mockResolvedValueOnce([{}, {}, {}]);
    const { findByTestId } = renderUpdateLog();
    const tableElement = await findByTestId("table-update-log");
    const tableRowElements = tableElement.getElementsByTagName("tr");
    expect(tableRowElements.length).toEqual(4);
  });

  it("can show failed message", async () => {
    codeSendServiceMock.getAllUpdates.mockRejectedValueOnce({
      status: "error",
      message: "failed to get update"
    });

    const { findByText } = renderUpdateLog();
    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
