const request = require('supertest')
const app     = require('../app')

describe('GET contracts/:id', () => {
    it('It should return a single contract', async () => {
        await request(app)
        .get('/contracts/6')
        .set('Accept', 'application/json')
        .set({'profile_id': '7'})
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

describe('GET contracts/:id', () => {
    it('It should not return a single contract due to bad :id value', async () => {
        await request(app)
        .get('/contracts/RandomString')
        .set('Accept', 'application/json')
        .set({'profile_id': '7'})
        .query({ 'id': '1' })
        .expect('Content-Type', /json/)
        .expect(404)
    })
})

describe('GET contracts/:id', () => {
    it('It should reject the request due to missing profile_id value', async () => {
        await request(app)
        .get('/contracts/6')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
    })
})

describe('GET contracts/', () => {
    it('It should return a list of contracts', async () => {
        await request(app)
        .get('/contracts/')
        .set('Accept', 'application/json')
        .set({'profile_id':'2'})
        .expect('Content-Type', /json/)
        .expect(200)
    })
})