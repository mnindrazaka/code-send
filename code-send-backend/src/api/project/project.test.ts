require("dotenv").config();
import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import {
  connectDB,
  closeDB,
  mockingDatabaseRecord,
  clearDB
} from "utils/database";

process.env.JWT_SECRET = "secret";
const request = supertest(app);

const authenticate = async () => {
  const authenticateResponse = await request
    .post("/user/authenticate")
    .send({ username: "mnindrazaka", password: "mnindrazaka" });
  return authenticateResponse.body.token as string;
};

describe("project", () => {
  beforeAll(async () => await connectDB(true));

  beforeEach(async () => {
    await clearDB();
    await mockingDatabaseRecord();
  });

  afterAll(async () => await closeDB(true));

  it("can throw error if request not authenticated", async () => {
    const geAllProjectResponse = await request.get("/project").send();
    expect(geAllProjectResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(geAllProjectResponse.body)
      .to.has.property("message")
      .equal("authentication token not found");
  });

  it("can get all project", async () => {
    const token = await authenticate();
    const geAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    expect(geAllProjectResponse.body).to.have.length(1);
  });

  it("can create project", async () => {
    const token = await authenticate();
    const createProjectResponse = await request
      .post("/project")
      .set("authorization", `Bearer ${token}`)
      .send({ name: "sample-project" });
    expect(createProjectResponse.body).to.has.property("_id");
    expect(createProjectResponse.body)
      .to.has.property("name")
      .equal("sample-project");

    const geAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    expect(geAllProjectResponse.body).to.have.length(2);
  });

  it("can edit project", async () => {
    const token = await authenticate();

    const geAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = geAllProjectResponse.body[0]._id;

    const editProjectResponse = await request
      .put(`/project/${projectId}`)
      .set("authorization", `Bearer ${token}`)
      .send({ name: "wonderful-app" });

    expect(editProjectResponse.body).to.has.property("_id");
    expect(editProjectResponse.body)
      .to.has.property("name")
      .equal("wonderful-app");
  });

  it("can delete project", async () => {
    const token = await authenticate();
    const geAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = geAllProjectResponse.body[0]._id;

    const deleteProjectResponse = await request
      .delete(`/project/${projectId}`)
      .set("authorization", `Bearer ${token}`)
      .send();

    expect(deleteProjectResponse.body)
      .to.has.property("_id")
      .equal(projectId);

    const getAllProjectResponse2 = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    expect(getAllProjectResponse2.body).to.have.length(0);
  });

  it("can throw error if edited project not found", async () => {
    const token = await authenticate();
    const editProjectResponse = await request
      .put(`/project/5e7fe2afa491a60003842d5a`)
      .set("authorization", `Bearer ${token}`)
      .send({ name: "wonderful-app" });

    expect(editProjectResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(editProjectResponse.body)
      .to.has.property("message")
      .equal("project not found");
  });
});
