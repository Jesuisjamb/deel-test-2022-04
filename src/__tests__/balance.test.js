const request = require('supertest')
const app     = require('../app')

describe('POST balances/deposit/:userId', () => {
    it('It should return a confirmation object', async () => {
        await request(app)
        .post('/balances/deposit/2')
        .set('Accept', 'application/json')
        .set({'profile_id': '2'})
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

describe('POST balances/deposit/:userId', () => {
    it('It should return error object due to bad :userId value', async () => {
        await request(app)
        .post('/balances/deposit/10')
        .set('Accept', 'application/json')
        .set({'profile_id': '2'})
        .expect('Content-Type', /json/)
        .expect(404)
    })
})
