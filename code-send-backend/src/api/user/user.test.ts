require("dotenv").config();
import supertest from "supertest";
import { expect } from "chai";
import app from "app";
import { connectDB, mockingDatabaseRecord, closeDB } from "utils/database";

process.env.JWT_SECRET = "secret";
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
      .equal("username already exist");
  });

  it("can authenticate user", async () => {
    const authenticateResponse = await request
      .post("/user/authenticate")
      .send({ username: "mnindrazaka", password: "mnindrazaka" });
    expect(authenticateResponse.body).to.has.property("token");
  });

  it("can show error message if username or password wrong", async () => {
    const authenticateResponse = await request
      .post("/user/authenticate")
      .send({ username: "mnindrazaka2", password: "mnindrazaka2" });
    expect(authenticateResponse.body)
      .to.has.property("status")
      .equal("error");
    expect(authenticateResponse.body)
      .to.has.property("message")
      .equal("username or password wrong");
  });
});
