import supertest from 'supertest'
import app from 'app'
import { expect } from 'chai'
import { connectDB } from 'config/database'
const request = supertest(app)

describe('update', () => {
  beforeAll(async () => await connectDB(true))

  test('create update', async () => {
    const res = await request.post('/update').send({
      version: '0.1',
      note: 'first release'
    })
    expect(res.body).to.has.property('_id')
    expect(res.body).to.has.property('version')
    expect(res.body).to.has.property('note')
  })
})
