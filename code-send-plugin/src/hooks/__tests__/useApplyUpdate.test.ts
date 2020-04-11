import { renderHook, act } from "@testing-library/react-hooks";
import useApplyUpdate from "../useApplyUpdate";
import bundleManager from "../../utils/bundleManager";
import { Update } from "../../interfaces/Update";

jest.mock("../../utils/bundleManager");
const bundleManagerMock = bundleManager as jest.Mocked<typeof bundleManager>;

describe("useApplyUpdate", () => {
  it("can return filename if download bundle success", async () => {
    const filename = "/data/data/package/files/bundle/0.1.bundle";
    bundleManagerMock.downloadBundle.mockResolvedValueOnce(filename);
    const { result, waitForNextUpdate } = renderHook(() => useApplyUpdate());
    act(() => {
      result.current.applyUpdate({
        _id: "5e7fe2afa491f60003847d6b",
        createdAt: "2020-03-29T21:59:47.213Z",
        updatedAt: "2020-03-29T21:59:47.213Z",
        version: "0.1",
        note: "first update",
        bundleUrl: "https://bundle.com/download"
      });
    });
    await waitForNextUpdate();
    expect(result.current.filename).toBe(filename);
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(false);
  });

  it("can return error if download bundle failed", async () => {
    bundleManagerMock.downloadBundle.mockRejectedValueOnce(
      "failed to download"
    );
    const { result, waitForNextUpdate } = renderHook(() => useApplyUpdate());
    act(() => {
      result.current.applyUpdate({
        _id: "5e7fe2afa491f60003847d6b",
        createdAt: "2020-03-29T21:59:47.213Z",
        updatedAt: "2020-03-29T21:59:47.213Z",
        version: "0.1",
        note: "first update",
        bundleUrl: "https://bundle.com/download"
      });
    });
    await waitForNextUpdate();
    expect(result.current.filename).toBe(undefined);
    expect(result.current.error).toBe("failed to download");
    expect(result.current.loading).toBe(false);
  });
});
