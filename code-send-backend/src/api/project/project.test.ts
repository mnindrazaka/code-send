import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import { connectDB, closeDB, mockingDatabaseRecord } from "utils/database";
const request = supertest(app);

describe("project", () => {
  beforeEach(async () => {
    await connectDB(true);
    await mockingDatabaseRecord();
  });

  afterEach(async () => await closeDB(true));

  it("can get all project", async () => {
    const geAllProjectResponse = await request.get("/project").send();
    expect(geAllProjectResponse.body).to.have.length(1);
  });

  it("can create project", async () => {
    const createProjectResponse = await request
      .post("/project")
      .send({ name: "sample-project" });
    expect(createProjectResponse.body).to.has.property("_id");
    expect(createProjectResponse.body)
      .to.has.property("name")
      .equal("sample-project");

    const geAllProjectResponse = await request.get("/project").send();
    expect(geAllProjectResponse.body).to.have.length(2);
  });

  it("can edit project", async () => {
    const geAllProjectResponse = await request.get("/project").send();
    const projectId = geAllProjectResponse.body[0]._id;

    const editProjectResponse = await request
      .put(`/project/${projectId}`)
      .send({ name: "wonderful-app" });

    expect(editProjectResponse.body).to.has.property("_id");
    expect(editProjectResponse.body)
      .to.has.property("name")
      .equal("wonderful-app");
  });

  it("can throw error if edited project not found", async () => {
    const editProjectResponse = await request
      .put(`/project/5e7fe2afa491a60003842d5a`)
      .send({ name: "wonderful-app" });

    expect(editProjectResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(editProjectResponse.body)
      .to.has.property("message")
      .equal("project not found");
  });
});
