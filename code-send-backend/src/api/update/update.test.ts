import supertest from 'supertest'
import { expect } from 'chai'
import app from 'app'
import { connectMockDB } from 'config/database'
const request = supertest(app)

describe('update', () => {
  beforeAll(async () => await connectMockDB())

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
