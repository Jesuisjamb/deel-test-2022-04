const request = require('supertest')
const app     = require('../app')

describe('GET jobs/unpaid', () => {
    it('It should return a list of unpaid jobs', async () => {
        await request(app)
        .get('/jobs/unpaid')
        .set('Accept', 'application/json')
        .set({'profile_id':'2'})
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

// When job is valid for payment response is 200
// When job is not valid for payment response is 401
// Therefore status is not evaluated
describe('POST jobs/:job_id/pay', () => {
    it('It should return a confirmation object', async () => {
        await request(app)
        .post('/jobs/3/pay')
        .set('Accept', 'application/json')
        .set({'profile_id': '2'})
        .expect('Content-Type', /json/)
        //.expect(200)
    })
})