import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send({ message: 'hello world' })
})

export default app
