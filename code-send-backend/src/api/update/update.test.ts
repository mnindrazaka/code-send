require("dotenv").config();
import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import { connectDB, closeDB, mockingDatabaseRecord } from "utils/database";
import geocodingUtil from "api/geocoding/geocoding.util";

process.env.JWT_SECRET = "secret";
const request = supertest(app);

jest.mock("api/geocoding/geocoding.util");
const geocodingUtilMock = geocodingUtil as jest.Mocked<typeof geocodingUtil>;

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
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    const getAllUpdateResponse = await request
      .get(`/project/${projectId}/update`)
      .send();
    expect(getAllUpdateResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(getAllUpdateResponse.body)
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
      .length(2);
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
      .equal("0.2");
    expect(getLatestUpdateResponse.body)
      .to.has.property("note")
      .equal("second update");
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
        version: "0.3",
        note: "third release"
      });

    expect(createUpdateResponse.body).to.has.property("_id");
    expect(createUpdateResponse.body)
      .to.has.property("version")
      .equal("0.3");
    expect(createUpdateResponse.body)
      .to.has.property("note")
      .equal("third release");
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

  it("can get latest update if update is not regional update", async () => {
    const token = await authenticate();
    const getAllProjectResponse = await request
      .get("/project")
      .set("authorization", `Bearer ${token}`)
      .send();
    const projectId = getAllProjectResponse.body[0]._id;

    await request
      .post(`/project/${projectId}/update`)
      .set("authorization", `Bearer ${token}`)
      .send({
        version: "0.3",
        note: "third release",
        bundleUrl: "http://localhost"
      });

    const getAllUpdateResponse = await request
      .get(`/project/${projectId}/update`)
      .set("authorization", `Bearer ${token}`)
      .send();
    const updateId = getAllUpdateResponse.body[0]._id;

    const checkUpdateResponse = await request
      .post(`/project/${projectId}/update/check`)
      .send({ updateId, latitude: -7.756928, longitude: 113.211502 });

    expect(checkUpdateResponse.body)
      .to.has.property("_id")
      .equal(getAllUpdateResponse.body[2]._id);
    expect(checkUpdateResponse.body)
      .to.has.property("version")
      .that.has.equal(getAllUpdateResponse.body[2].version);
    expect(checkUpdateResponse.body)
      .to.has.property("note")
      .that.has.equal(getAllUpdateResponse.body[2].note);
    expect(checkUpdateResponse.body)
      .to.has.property("bundleUrl")
      .that.has.equal(getAllUpdateResponse.body[2].bundleUrl);
  });

  it("can get latest update if in the same region when checking update", async () => {
    geocodingUtilMock.reverse.mockResolvedValue("Jawa Timur, Indonesia");

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

    const checkUpdateResponse = await request
      .post(`/project/${projectId}/update/check`)
      .send({ updateId, latitude: -7.756928, longitude: 113.211502 });

    expect(checkUpdateResponse.body)
      .to.has.property("_id")
      .equal(getAllUpdateResponse.body[1]._id);
    expect(checkUpdateResponse.body)
      .to.has.property("version")
      .that.has.equal(getAllUpdateResponse.body[1].version);
    expect(checkUpdateResponse.body)
      .to.has.property("note")
      .that.has.equal(getAllUpdateResponse.body[1].note);
    expect(checkUpdateResponse.body)
      .to.has.property("bundleUrl")
      .that.has.equal(getAllUpdateResponse.body[1].bundleUrl);
  });

  it("can't get latest update if not in the same region when checking update", async () => {
    geocodingUtilMock.reverse.mockResolvedValueOnce("Jakarta, Indonesia");
    geocodingUtilMock.reverse.mockResolvedValueOnce("Jawa Timur, Indonesia");

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

    const checkUpdateResponse = await request
      .post(`/project/${projectId}/update/check`)
      .send({ updateId, latitude: -6.2, longitude: 106.816666 });

    expect(checkUpdateResponse.body).to.not.has.property("_id");
  });

  it("can't get latest update if update is not newer when checking update", async () => {
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
    const updateId = getAllUpdateResponse.body[1]._id;

    const checkUpdateResponse = await request
      .post(`/project/${projectId}/update/check`)
      .send({ updateId, latitude: -6.2, longitude: 106.816666 });

    expect(checkUpdateResponse.body).to.not.has.property("_id");
  });
});
