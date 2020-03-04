import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import { connectDB, closeDB } from "utils/database";
import updateModel from "./update.model";
const request = supertest(app);

const mockingDatabaseRecord = () => {
  return updateModel.create({
    version: "0.1",
    note: "first release",
    bundleUrl: "http://localhost"
  });
};

describe("update", () => {
  beforeEach(async () => {
    await connectDB(true);
    await mockingDatabaseRecord();
  });
  afterEach(async () => await closeDB(true));

  test("get all update", async () => {
    const res = await request.get("/update").send();
    expect(res.body).to.be.an("array");
  });

  test("get latest update", async () => {
    const res = await request.get("/update/latest").send();
    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("version");
    expect(res.body).to.has.property("note");
  });

  test("create update", async () => {
    const res = await request.post("/update").send({
      version: "0.1",
      note: "first release"
    });
    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("version");
    expect(res.body).to.has.property("note");
  });
});
