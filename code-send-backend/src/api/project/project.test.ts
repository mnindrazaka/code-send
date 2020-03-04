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
    const res = await request.get("/project").send();
    expect(res.body).to.be.an("array");
  });

  it("can create project", async () => {
    const res = await request.post("/project").send({ name: "sample-project" });
    expect(res.body).to.has.property("_id");
    expect(res.body).to.has.property("name");
  });
});
