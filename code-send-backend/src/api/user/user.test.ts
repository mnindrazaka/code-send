import supertest from "supertest";
import { expect } from "chai";
import app from "app";
import { connectDB, mockingDatabaseRecord, closeDB } from "utils/database";

const request = supertest(app);

describe("user", () => {
  beforeEach(async () => {
    await connectDB(true);
    await mockingDatabaseRecord();
  });

  afterEach(async () => await closeDB(true));

  it("can create user", async () => {
    const createUserResponse = await request
      .post("/user")
      .send({ username: "budiman", password: "budiman" });
    expect(createUserResponse.body).to.has.property("_id");
    expect(createUserResponse.body)
      .to.has.property("username")
      .equal("budiman");
    expect(createUserResponse.body)
      .to.has.property("password")
      .not.equal("budiman");
  });

  it("can prevent duplicate username", async () => {
    const createUserResponse = await request
      .post("/user")
      .send({ username: "mnindrazaka", password: "mnindrazaka" });
    expect(createUserResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(createUserResponse.body)
      .to.has.property("message")
      .equal('E11000 duplicate key error dup key: { : "mnindrazaka" }');
  });
});
