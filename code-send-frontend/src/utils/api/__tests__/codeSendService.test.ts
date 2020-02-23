import codeSendService from "../codeSendService";
import Service from "../service";

jest.mock("../service");
const ServiceMock = Service as jest.MockedClass<typeof Service>;

describe("code send service", () => {
  it("can get all update", () => {
    codeSendService.getAllUpdate();
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith("/update");
  });

  it("can create update", () => {
    const update = { note: "mock note", version: "mock version" };
    codeSendService.createUpdate(update);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      "/update",
      update
    );
  });

  it("can upload update", () => {
    const id = "mock id";
    const bundle = new Blob([]);
    const formData = new FormData();
    formData.append("bundle", bundle);

    codeSendService.uploadUpdate(id, bundle);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/update/${id}/bundle`,
      formData
    );
  });
});
