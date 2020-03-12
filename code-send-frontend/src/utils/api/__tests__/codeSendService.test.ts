import codeSendService from "../codeSendService";
import Service from "../service";

jest.mock("../service");
const ServiceMock = Service as jest.MockedClass<typeof Service>;

describe("code send service", () => {
  it("can get all projects", () => {
    codeSendService.getallProjects();
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith("/project");
  });

  it("can create project", () => {
    const project = { name: "mock name" };
    codeSendService.createProject(project);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      "/project",
      project
    );
  });

  it("can edit project", () => {
    const projectId = "mock project id";
    const project = { name: "mock name" };
    codeSendService.editProject(projectId, project);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/project/${projectId}`,
      project
    );
  });

  it("can get all updates", () => {
    const projectId = "mock project id";
    codeSendService.getAllUpdates(projectId);
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith(
      `/project/${projectId}/update`
    );
  });

  it("can get latest update", () => {
    const projectId = "mock project id";
    codeSendService.getLatestUpdate(projectId);
    expect(ServiceMock.mock.instances[0].get).toHaveBeenCalledWith(
      `/project/${projectId}/update/latest`
    );
  });

  it("can create update", () => {
    const projectId = "mock project id";
    const update = { note: "mock note", version: "mock version" };
    codeSendService.createUpdate(projectId, update);
    expect(ServiceMock.mock.instances[0].post).toHaveBeenCalledWith(
      `/project/${projectId}/update`,
      update
    );
  });

  it("can edit update", () => {
    const projectId = "mock project id";
    const updateId = "mock update id";
    const update = { note: "mock note", version: "mock version" };
    codeSendService.editUpdate(projectId, updateId, update);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/project/${projectId}/update/${updateId}`,
      update
    );
  });

  it("can upload update", () => {
    const projectId = "mock id";
    const updateId = "mock id";
    const bundle = new Blob([]);
    const formData = new FormData();
    formData.append("bundle", bundle);

    codeSendService.uploadUpdate(projectId, updateId, bundle);
    expect(ServiceMock.mock.instances[0].put).toHaveBeenCalledWith(
      `/project/${projectId}/update/${updateId}/bundle`,
      formData
    );
  });
});
