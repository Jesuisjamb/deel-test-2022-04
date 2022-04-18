const request = require('supertest')
const app     = require('../app')

describe('GET admin/best-profession?start=YYYY-MM-DD&end=YYYY-MM-DD', () => {
    it('It should return an object', async () => {
        await request(app)
        .get('/admin/best-profession')
        .set('Accept', 'application/json')
        .set({'profile_id': '7'})
        .query({
            'start':'2010-04-15',
            'end':'2022-08-15'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            const path = '/admin/best-profession'
            expect(res.req.path).toBe(`${path}?start=2010-04-15&end=2022-08-15`)
        })
    })
})

describe('GET admin/best-clients?start=YYYY-MM-DD&end=YYYY-MM-DD&limit=N', () => {
    it('It should return an object', async () => {
        await request(app)
        .get('/admin/best-clients')
        .set('Accept', 'application/json')
        .set({'profile_id': '7'})
        .query({
            'start':'2010-04-15',
            'end':'2022-08-15',
            'limit':'3'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            const path = '/admin/best-clients'
            expect(res.req.path).toBe(`${path}?start=2010-04-15&end=2022-08-15&limit=3`)
        })
    })
})