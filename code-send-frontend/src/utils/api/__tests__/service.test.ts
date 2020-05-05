import Service from "../service";
import axios from "axios";

const baseURL = "http://mock.com";
const service = new Service(baseURL);

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("service", () => {
  it("can run get method with correct parameter", async () => {
    axiosMock.get.mockResolvedValueOnce({ data: {} });
    await service.get("/endpoint");
    expect(axiosMock.get).toHaveBeenCalledWith(baseURL + "/endpoint", {
      headers: { authorization: "Bearer undefined" }
    });
  });

  it("can run post method with correct parameter", async () => {
    axiosMock.post.mockResolvedValueOnce({ data: {} });
    await service.post("/endpoint", {});
    expect(axiosMock.post).toHaveBeenCalledWith(
      baseURL + "/endpoint",
      {},
      {
        headers: { authorization: "Bearer undefined" }
      }
    );
  });

  it("can run put method with correct parameter", async () => {
    axiosMock.put.mockResolvedValueOnce({ data: {} });
    await service.put("/endpoint", {});
    expect(axiosMock.put).toHaveBeenCalledWith(
      baseURL + "/endpoint",
      {},
      {
        headers: { authorization: "Bearer undefined" }
      }
    );
  });

  it("can run delete method with correct parameter", async () => {
    axiosMock.delete.mockResolvedValueOnce({ data: {} });
    await service.delete("/endpoint");
    expect(axiosMock.delete).toHaveBeenCalledWith(baseURL + "/endpoint", {
      headers: { authorization: "Bearer undefined" }
    });
  });

  it("can handle error", async () => {
    const message = "your request failed";
    axiosMock.get.mockResolvedValueOnce({ data: { status: "error", message } });
    service.get("/endpoint").catch(error => expect(error).toEqual(message));
  });
});
