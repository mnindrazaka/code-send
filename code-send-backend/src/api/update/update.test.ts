import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import { connectDB, closeDB, mockingDatabaseRecord } from "utils/database";
const request = supertest(app);

describe("update", () => {
  beforeEach(async () => {
    await connectDB(true);
    await mockingDatabaseRecord();
  });
  afterEach(async () => await closeDB(true));

  it("can get all update", async () => {
    const getAllProjectResponse = await request.get("/project").send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getAllUpdateResponse = await request
      .get(`/project/${projectId}/update`)
      .send();
    expect(getAllUpdateResponse.body)
      .to.be.an("array")
      .length(1);
  });

  it("can get latest update", async () => {
    const getAllProjectResponse = await request.get("/project").send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getLatestUpdateResponse = await request
      .get(`/project/${projectId}/update/latest`)
      .send();
    expect(getLatestUpdateResponse.body).to.has.property("_id");
    expect(getLatestUpdateResponse.body)
      .to.has.property("version")
      .equal("0.1");
    expect(getLatestUpdateResponse.body)
      .to.has.property("note")
      .equal("first update");
    expect(getLatestUpdateResponse.body)
      .to.has.property("location")
      .to.has.property("latitude")
      .equal(-7.93917);
    expect(getLatestUpdateResponse.body)
      .to.has.property("location")
      .to.has.property("longitude")
      .equal(112.95278);
    expect(getLatestUpdateResponse.body)
      .to.has.property("location")
      .to.has.property("name")
      .equal("Jawa Timur, Indonesia");
  });

  it("can throw error if latest update not found", async () => {
    const getLatestUpdateResponse = await request
      .get(`/project/5e7fe2afa491a60003842d5a/update/latest`)
      .send();
    expect(getLatestUpdateResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(getLatestUpdateResponse.body)
      .to.has.property("message")
      .equal("update not found");
  });

  it("can create update", async () => {
    const getAllProjectResponse = await request.get("/project").send();
    const projectId = getAllProjectResponse.body[0]._id;

    const createUpdateResponse = await request
      .post(`/project/${projectId}/update`)
      .send({
        version: "0.2",
        note: "second release"
      });

    expect(createUpdateResponse.body).to.has.property("_id");
    expect(createUpdateResponse.body)
      .to.has.property("version")
      .equal("0.2");
    expect(createUpdateResponse.body)
      .to.has.property("note")
      .equal("second release");
  });

  it("can edit update", async () => {
    const getAllProjectResponse = await request.get("/project").send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getAllUpdateResponse = await request
      .get(`/project/${projectId}/update`)
      .send();
    const updateId = getAllUpdateResponse.body[0]._id;

    const editUpdateResponse = await request
      .put(`/project/${projectId}/update/${updateId}`)
      .send({ note: "wonderful update" });

    expect(editUpdateResponse.body)
      .has.property("note")
      .equal("wonderful update");
  });

  it("can throw error if edited update not found", async () => {
    const getAllProjectResponse = await request.get("/project").send();
    const projectId = getAllProjectResponse.body[0]._id;

    const editUpdateResponse = await request
      .put(`/project/${projectId}/update/5e7fe2afa491a60003842d5a`)
      .send({ note: "wonderful update" });
    expect(editUpdateResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(editUpdateResponse.body)
      .to.has.property("message")
      .equal("update not found");
  });
});
