import codeSendService from "../codeSendService";
import Service from "../service";

jest.mock("../service");
const ServiceMock = Service as jest.MockedClass<typeof Service>;

describe("code send service", () => {
  it("can register user", () => {
    const user = { username: "mnindrazaka", password: "mnindrazaka" };
    codeSendService.register(user);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      "/user",
      user
    );
  });

  it("can logged in user", () => {
    const user = { username: "mnindrazaka", password: "mnindrazaka" };
    codeSendService.login(user);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      "/user/authenticate",
      user
    );
  });

  it("can get all projects", () => {
    codeSendService.getallProjects();
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith("/project");
  });

  it("can create project", () => {
    const project = { name: "awesome project" };
    codeSendService.createProject(project);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      "/project",
      project
    );
  });

  it("can edit project", () => {
    const projectId = "52a45a4637654f5s4";
    const project = { name: "awesome project" };
    codeSendService.editProject(projectId, project);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/project/${projectId}`,
      project
    );
  });

  it("can delete project", () => {
    const projectId = "52a45a4637654f5s4";
    codeSendService.deleteProject(projectId);
    expect(ServiceMock.mock.instances[0].delete).toHaveBeenCalledWith(
      `/project/${projectId}`
    );
  });

  it("can get all updates", () => {
    const projectId = "52a45a4637654f5s4";
    codeSendService.getAllUpdates(projectId);
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith(
      `/project/${projectId}/update`
    );
  });

  it("can get latest update", () => {
    const projectId = "52a45a4637654f5s4";
    codeSendService.getLatestUpdate(projectId);
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith(
      `/project/${projectId}/update/latest`
    );
  });

  it("can create update", () => {
    const projectId = "52a45a4637654f5s4";
    const update = { note: "first update", version: "0.1" };
    codeSendService.createUpdate(projectId, update);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      `/project/${projectId}/update`,
      update
    );
  });

  it("can edit update", () => {
    const projectId = "52a45a4637654f5s4";
    const updateId = "5fzsf67sz7fs5f7s";
    const update = { note: "first update", version: "0.1" };
    codeSendService.editUpdate(projectId, updateId, update);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/project/${projectId}/update/${updateId}`,
      update
    );
  });

  it("can upload update", () => {
    const projectId = "52a45a4637654f5s4";
    const updateId = "5fzsf67sz7fs5f7s";
    const bundle = new Blob([]);
    const formData = new FormData();
    formData.append("bundle", bundle);

    codeSendService.uploadUpdate(projectId, updateId, bundle);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/project/${projectId}/update/${updateId}/bundle`,
      formData
    );
  });

  it("can check update", () => {
    const projectId = "52a45a4637654f5s4";
    const updateId = "5fzsf67sz7fs5f7s";
    const latitude = -7.756928;
    const longitude = 113.211502;

    codeSendService.checkUpdate(projectId, latitude, longitude, updateId);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      `/project/${projectId}/update/check`,
      {
        latitude,
        longitude,
        updateId
      }
    );
  });

  it("can do forward geocoding", () => {
    const query = "jawa";
    codeSendService.forwardGeocoding(query);
    expect(
      ServiceMock.mock.instances[0].post
    ).toHaveBeenCalledWith(`/geocoding/forward`, { query });
  });

  it("can do reverse geocoding", () => {
    const latitude = -7.756928;
    const longitude = 113.211502;
    codeSendService.reverseGeocoding(latitude, longitude);
    expect(
      ServiceMock.mock.instances[0].post
    ).toHaveBeenCalledWith(`/geocoding/reverse`, { latitude, longitude });
  });
});
