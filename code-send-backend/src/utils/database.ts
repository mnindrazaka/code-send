import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import projectModel from "api/project/project.model";
import updateModel from "api/update/update.model";
import userModel from "api/user/user.model";
import userUtil from "api/user/user.util";

const mongoMemoryServer = new MongoMemoryServer();
const { USERNAME, PASSWORD } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

async function getConnectionString(isUsingMemory?: boolean) {
  return isUsingMemory
    ? await mongoMemoryServer.getConnectionString()
    : `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-uzclu.mongodb.net/main?retryWrites=true&w=majority`;
}

export async function connectDB(isUsingMemory?: boolean) {
  const connectionString = await getConnectionString(isUsingMemory);
  return mongoose.connect(connectionString, options);
}

export async function closeDB(isUsingMemory?: boolean) {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (isUsingMemory) await mongoMemoryServer.stop();
}

export async function mockingDatabaseRecord() {
  const user = await userModel.create({
    username: "mnindrazaka",
    password: await userUtil.hash("mnindrazaka")
  });

  const user2 = await userModel.create({
    username: "joko",
    password: await userUtil.hash("joko")
  });

  const project = await projectModel.create({
    name: "project-1",
    user: user._id
  });

  await projectModel.create({
    name: "project-2",
    user: user2._id
  });

  await updateModel.create({
    version: "0.1",
    note: "first update",
    location: {
      latitude: -7.93917,
      longitude: 112.95278,
      name: "Jawa Timur, Indonesia"
    },
    bundleUrl: "http://localhost",
    project: project._id
  });
}
