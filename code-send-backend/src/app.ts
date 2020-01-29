import express from 'express'
import updateRouter from 'api/update/updateRouter'
const app = express()

app.use(express.json())
app.use('/update', updateRouter)

export default app
