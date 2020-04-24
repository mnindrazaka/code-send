import { renderHook, act } from "@testing-library/react-hooks";
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
      _id: "5e7fe2afa491f60003847d6b",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "2020-03-29T21:59:47.213Z",
      version: "0.1",
      note: "first update",
      bundleUrl: "https://bundle.com/download"
    };

    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce(update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useCheckUpdate());
    await act(() => result.current.checkUpdate("85eu3k693hf983y52huw883279"));

    expect(result.current.update).toBe(update);
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(false);
  });

  it("can return latest update if active bundle date is older", async () => {
    const update: Update = {
      _id: "5e7fe2afa491f60003847d6b",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "2020-03-29T21:59:47.213Z",
      version: "0.2",
      note: "second update",
      bundleUrl: "https://bundle.com/download"
    };

    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce(update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce({
      filename: "/data/data/package/files/bundle/0.1.bundle",
      update: {
        _id: "65hgh3iu89ue83jgij39wy89t36",
        createdAt: "2020-03-28T21:59:47.213Z",
        updatedAt: "2020-03-28T21:59:47.213Z",
        version: "0.1",
        note: "first update",
        bundleUrl: "https://bundle.com/download"
      }
    });

    const { result } = renderHook(() => useCheckUpdate());
    await act(() => result.current.checkUpdate("85eu3k693hf983y52huw883279"));

    expect(result.current.update).toBe(update);
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(false);
  });

  it("can return undefined if active bundle date is the same or newer", async () => {
    const update: Update = {
      _id: "546753285632859869423",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "2020-03-29T21:59:47.213Z",
      version: "0.1",
      note: "first update",
      bundleUrl: "https://bundle.com/download"
    };
    codeSendServiceMock.getLatestUpdate.mockResolvedValueOnce(update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce({
      filename: "/data/data/package/files/bundle/0.1.bundle",
      update: {
        _id: "546753285632859869423",
        createdAt: "2020-03-29T21:59:47.213Z",
        updatedAt: "2020-03-29T21:59:47.213Z",
        version: "0.1",
        note: "first update",
        bundleUrl: "https://bundle.com/download"
      }
    });

    const { result } = renderHook(() => useCheckUpdate());
    await act(() => result.current.checkUpdate("85eu3k693hf983y52huw883279"));

    expect(result.current.update).toBe(undefined);
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(false);
  });

  it("can return error if server throw error", async () => {
    codeSendServiceMock.getLatestUpdate.mockRejectedValueOnce({
      status: "error",
      message: "no update available"
    });
    const { result } = renderHook(() => useCheckUpdate());
    await act(() => result.current.checkUpdate("85eu3k693hf983y52huw883279"));

    expect(result.current.update).toBe(undefined);
    expect(result.current.error).toBe("no update available");
    expect(result.current.loading).toBe(false);
  });
});
