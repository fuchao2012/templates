const utls = require('../utils');
const app = require('../server/index');
const request = require('supertest')(app);
const assert = require('power-assert');

describe('Test template REST', function () {
    it('GET /xhr/v1/template', done => {
        request
            .get('/xhr/v1/template')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.code === 200)
                assert(res.body.msg === 'success')
                assert(Array.isArray(res.body.data), 'response data need tobe List')
                done();
            })
    })

    it('GET /xhr/v1/template/:id', done => {
        request
            .get('/xhr/v1/template/5ef45b316dde571a73e91489')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.code === 200)
                assert(res.body.msg === 'success')
                assert(utls.$type(res.body.data, 'object'), 'response data need tobe List')
                done();
            })
    })

    it('GET /xhr/v1/template/:id with bad id', done => {
        request
            .get('/xhr/v1/template/111')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.code === 403)
                assert(res.body.msg === '无数据')
                done();
            })
    })

    it('POST /xhr/v1/template', done => {
        const newTemplate = {
            name: 'autoTest',
            template: '<h2>hello ${name}</h2>',
            data: '{"name":"auto test"}'
        };
        request
            .post('/xhr/v1/template', newTemplate)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.code === 200)
                assert(res.body.msg === 'success')
                assert(utls.$type(res.body.data, 'object'), 'response data need tobe List')
                assert(res.body.data.name === newTemplate.name)
                done();
            })
    })
});
