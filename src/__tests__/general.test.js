const request = require('supertest')
const app     = require('../app')

describe('GET /', () => {
    it('It should return a "Invalid API Route" message', async () => {
        await request(app)
        .get('/')
        .set('Accept', 'application/json')
        .set({'profile_id':'1'})
        .expect('Content-Type', /json/)
        .expect(500)
    })
})

describe('GET /RamdonRoute', () => {
    it('It should return a "Invalid API Route" message', async () => {
        await request(app)
        .get('/')
        .set('Accept', 'application/json')
        .set({'profile_id':'1'})
        .expect('Content-Type', /json/)
        .expect(500)
    })
})