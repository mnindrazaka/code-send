import supertest from 'supertest'
import app from './app'

const request = supertest(app)

test('get to endpoint', async () => {
  const res = await request.get('/')
  expect(res.status).toBe(200)
  expect(res.body.message).toBe('hello world')
})
