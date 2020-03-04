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
    const res = await request.get("/update").send();
    expect(res.body).to.be.an("array");
  });

  it("can get latest update", async () => {
    const res = await request.get("/update/latest").send();
    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("version");
    expect(res.body).to.has.property("note");
  });

  it("can create update", async () => {
    const res = await request.post("/update").send({
      version: "0.1",
      note: "first release"
    });
    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("version");
    expect(res.body).to.has.property("note");
  });
});
