import { renderHook } from "@testing-library/react-hooks";
import codeSendService from "../../utils/api/codeSendService";
import bundleManager from "../../utils/bundleManager";
import useCodeSend from "../useCodeSend";
import { Bundle } from "../../interfaces/Bundle";
import {
  GeolocationResponse,
  GeolocationError
} from "@react-native-community/geolocation";

jest.mock("../../utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

jest.mock("../../utils/bundleManager");
const bundleManagerMock = bundleManager as jest.Mocked<typeof bundleManager>;

jest.mock("@react-native-community/geolocation", () => {
  return {
    getCurrentPosition: jest.fn(
      (
        success: (position: GeolocationResponse) => void,
        error?: (error: GeolocationError) => void
      ) => {
        success({
          coords: {
            accuracy: 1,
            latitude: 1,
            longitude: 1,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
          },
          timestamp: 1
        });
      }
    )
  };
});

describe("useCodeSend", () => {
  it("can return latest bundle", async () => {
    const bundle: Bundle = {
      filename: "/data/data/package/files/bundle/0.1.bundle",
      update: {
        _id: "5e7fe2afa491f60003847d6b",
        createdAt: "2020-03-29T21:59:47.213Z",
        updatedAt: "2020-03-29T21:59:47.213Z",
        version: "0.1",
        note: "first update",
        bundleUrl: "https://bundle.com/download"
      }
    };
    codeSendServiceMock.checkUpdate.mockResolvedValueOnce(bundle.update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce(null);
    bundleManagerMock.downloadBundle.mockResolvedValueOnce(bundle.filename);
    const { result, waitForNextUpdate } = renderHook(() =>
      useCodeSend("85eu3k693hf983y52huw883279")
    );
    await waitForNextUpdate();
    expect(result.current.bundle).toStrictEqual(bundle);
    expect(result.current.error).toBe(undefined);
    expect(result.current.status).toBe("standby");
  });
  it("can return error if download bundle failed", async () => {
    const bundle: Bundle = {
      filename: "/data/data/package/files/bundle/0.1.bundle",
      update: {
        _id: "5e7fe2afa491f60003847d6b",
        createdAt: "2020-03-29T21:59:47.213Z",
        updatedAt: "2020-03-29T21:59:47.213Z",
        version: "0.1",
        note: "first update",
        bundleUrl: "https://bundle.com/download"
      }
    };
    codeSendServiceMock.checkUpdate.mockResolvedValueOnce(bundle.update);
    bundleManagerMock.getActiveBundle.mockResolvedValueOnce(null);
    bundleManagerMock.downloadBundle.mockRejectedValue("failed to download");
    const { result, waitForNextUpdate } = renderHook(() =>
      useCodeSend("85eu3k693hf983y52huw883279")
    );
    await waitForNextUpdate();
    expect(result.current.bundle).toBe(undefined);
    expect(result.current.error).toBe("failed to download");
    expect(result.current.status).toBe("standby");
  });
});
