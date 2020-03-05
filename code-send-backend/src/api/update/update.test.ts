import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import { connectDB, closeDB, mockingDatabaseRecord } from "utils/database";
import projectModel from "api/project/project.model";
const request = supertest(app);

describe("update", () => {
  beforeEach(async () => {
    await connectDB(true);
    await mockingDatabaseRecord();
  });
  afterEach(async () => await closeDB(true));

  it("can get all update", async () => {
    const project = await projectModel.findOne();
    const res = await request.get(`/project/${project?._id}/update`).send();
    expect(res.body)
      .to.be.an("array")
      .length(1);
  });

  it("can get latest update", async () => {
    const project = await projectModel.findOne();
    const res = await request
      .get(`/project/${project?._id}/update/latest`)
      .send();
    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("version");
    expect(res.body).to.has.property("note");
  });

  it("can create update", async () => {
    const project = await projectModel.findOne();
    const res = await request.post(`/project/${project?._id}/update`).send({
      version: "0.1",
      note: "first release"
    });

    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("version");
    expect(res.body).to.has.property("note");
  });
});
