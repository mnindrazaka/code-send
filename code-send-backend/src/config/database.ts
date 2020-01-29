import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export function connectDB() {
  const connectionString =
    'mongodb+srv://root:toor@cluster0-uzclu.mongodb.net/main?retryWrites=true&w=majority'
  return new Promise((resolve, reject) => {
    mongoose
      .connect(connectionString, { useNewUrlParser: true })
      .then(resolve)
      .catch(reject)
  })
}

export function connectMockDB() {
  return new Promise((resolve, reject) => {
    new MongoMemoryServer()
      .getConnectionString()
      .then(connectionString => mongoose.connect(connectionString))
      .then(resolve)
      .catch(reject)
  })
}
