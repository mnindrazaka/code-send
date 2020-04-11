import { renderHook } from "@testing-library/react-hooks";
import bundleManager from "../../utils/bundleManager";
import codeSendService from "../../utils/api/codeSendService";
import useCheckUpdate from "../useCheckUpdate";
import { Update } from "../../interfaces/Update";

jest.mock("../../utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

jest.mock("../../utils/bundleManager");
const bundleManagerMock = bundleManager as jest.Mocked<typeof bundleManager>;

describe("useCheckUpdate", () => {
  it("can return latest update if no active bundle", async () => {
    const update: Update = {
      _id: "mockId",
      createdAt: "mockCreatedAt",
      updatedAt: "mockUpdatedAt",
      version: "mockVersion",
      note: "mockNote",
      bundleUrl: "mockBundleUrl"
    };
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce(update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
      useCheckUpdate("mockProjectId")
    );

    await waitForNextUpdate();
    expect(result.current.update).toBe(update);
  });

  it("can return latest update if active bundle older", async () => {
    const update: Update = {
      _id: "mockId",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "mockUpdatedAt",
      version: "mockVersion",
      note: "mockNote",
      bundleUrl: "mockBundleUrl"
    };
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce(update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce({
      filename: "mockFilename",
      update: {
        ...update,
        createdAt: "2020-03-28T21:59:47.213Z"
      }
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCheckUpdate("mockProjectId")
    );
    await waitForNextUpdate();
    expect(result.current.update).toBe(update);
  });

  it("can return undefined if active bundle is newer", async () => {
    const update: Update = {
      _id: "mockId",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "mockUpdatedAt",
      version: "mockVersion",
      note: "mockNote",
      bundleUrl: "mockBundleUrl"
    };
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce(update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce({
      filename: "mockFilename",
      update: {
        ...update,
        createdAt: "2020-03-30T21:59:47.213Z"
      }
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCheckUpdate("mockProjectId")
    );
    await waitForNextUpdate();
    expect(result.current.update).toBe(undefined);
  });

  // it("can return error if latest update not found");

  it("can return error if no response from server", async () => {
    const update: Update = {
      _id: "mockId",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "mockUpdatedAt",
      version: "mockVersion",
      note: "mockNote",
      bundleUrl: "mockBundleUrl"
    };
    codeSendServiceMock.getLatestUpdate.mockRejectedValueOnce({
      status: "error",
      message: "no update available"
    });
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce({
      filename: "mockFilename",
      update: {
        ...update,
        createdAt: "2020-03-30T21:59:47.213Z"
      }
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCheckUpdate("mockProjectId")
    );
    await waitForNextUpdate();
    expect(result.current.update).toBe(undefined);
    expect(result.current.error).toBe("no update available");
  });
});
