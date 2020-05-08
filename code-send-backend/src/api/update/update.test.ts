require("dotenv").config();
import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import { connectDB, closeDB, mockingDatabaseRecord } from "utils/database";

process.env.JWT_SECRET = "secret";
const request = supertest(app);

const authenticate = async () => {
  const authenticateResponse = await request
    .post("/user/authenticate")
    .send({ username: "mnindrazaka", password: "mnindrazaka" });
  return authenticateResponse.body.token as string;
};

describe("update", () => {
  beforeEach(async () => {
    await connectDB(true);
    await mockingDatabaseRecord();
  });
  afterEach(async () => await closeDB(true));

  it("can throw error if request not authenticated", async () => {
    const geAllUpdateResponse = await request.get("/update").send();
    expect(geAllUpdateResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(geAllUpdateResponse.body)
      .to.has.property("message")
      .equal("authentication token not found");
  });

  it("can get all update", async () => {
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getAllUpdateResponse = await request
      .get(`/project/${projectId}/update`)
      .set("authorization", `Bearer ${token}`)
      .send();
    expect(getAllUpdateResponse.body)
      .to.be.an("array")
      .length(1);
  });

  it("can get latest update", async () => {
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getLatestUpdateResponse = await request
      .get(`/project/${projectId}/update/latest`)
      .set("authorization", `Bearer ${token}`)
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

  it("can create update", async () => {
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    const createUpdateResponse = await request
      .post(`/project/${projectId}/update`)
      .set("authorization", `Bearer ${token}`)
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
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getAllUpdateResponse = await request
      .get(`/project/${projectId}/update`)
      .set("authorization", `Bearer ${token}`)
      .send();
    const updateId = getAllUpdateResponse.body[0]._id;

    const editUpdateResponse = await request
      .put(`/project/${projectId}/update/${updateId}`)
      .set("authorization", `Bearer ${token}`)
      .send({ note: "wonderful update" });

    expect(editUpdateResponse.body)
      .has.property("note")
      .equal("wonderful update");
  });

  it("can throw error if edited update not found", async () => {
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    const editUpdateResponse = await request
      .put(`/project/${projectId}/update/5e7fe2afa491a60003842d5a`)
      .set("authorization", `Bearer ${token}`)
      .send({ note: "wonderful update" });
    expect(editUpdateResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(editUpdateResponse.body)
      .to.has.property("message")
      .equal("update not found");
  });
});
