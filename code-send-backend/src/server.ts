import app from 'app'
import { connectDB } from 'config/database'

connectDB().then(() => {
  app.listen(3000, () => console.log('server running'))
})
