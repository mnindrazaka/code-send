import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const { USERNAME, PASSWORD } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

async function getConnectionString(isUsingMemory?: boolean) {
  return isUsingMemory
    ? await new MongoMemoryServer().getConnectionString()
    : `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-uzclu.mongodb.net/main?retryWrites=true&w=majority`;
}

export function connectDB(isUsingMemory?: boolean) {
  return new Promise((resolve, reject) => {
    getConnectionString(isUsingMemory)
      .then(connectionString => mongoose.connect(connectionString, options))
      .then(resolve)
      .catch(reject);
  });
}
