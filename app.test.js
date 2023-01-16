import app from './app.js'
import request from 'supertest'

describe('App tests', () => {
test('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe('Journal API')

})


describe('GET /categories', () => {
    let res

    beforeEach(async () => {
        res = await request(app).get('/categories')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.headers['content-type']).toMatch(/json/)
})

    it('Should return an array of 4 elements.', () => {
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(4)
    expect(res.body[0].name).toBeDefined()
    expect(res.body[0].name).toBe('Food')
    expect(res.body[1].name).toBeDefined()
    expect(res.body[1].name).toBe('Work')
    expect(res.body[2].name).toBeDefined()
    expect(res.body[2].name).toBe('Coding')
    expect(res.body[3].name).toBeDefined()
    expect(res.body[3].name).toBe('Other')
})

    it('Has an element with the correct data structure', () => {
        res.body.forEach(el => {
        expect(el.name).toBeDefined()
        expect(el._id).toBeDefined()
        expect(el._id.length).toBe(24)
        })
        expect(res.body[0].name).toBe('Food')
        })

    test('Create new entry', async () => {
        const res = await request(app).post('/entries').send({
            category: 'Work',
            content: 'I ate a sandwich for lunch.'
            })
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body.category.name).toBe('Work')
        expect(res.body.content).toBe('I ate a sandwich for lunch.')
    })

})
})