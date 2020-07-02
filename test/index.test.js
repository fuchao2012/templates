const app = require('../server/index');
const request = require('supertest')(app);


describe('test app.js', function () {

    it('GET /api 404', done => {
        request
            .get('/xhr')
            .expect(404, done)
    })
});
