const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');

let cookie;
let adminCookie;

chai.use(chaiHttp);

describe('Trash Tests', () => {

    before((finished) => {
        chai.request(server)
            .post('/user/login')
            .send({
                'email': 'test1@test.com',
                'password': 'test'
            })
            .end((err, res) => {
                cookie = res.headers['set-cookie'].pop().split(';')[0];
                finished();
            });
    });

    before((finished) => {
        chai.request(server)
            .post('/user/login')
            .send({
                'email': 'test2@test.com',
                'password': 'test123'
            })
            .end((err, res) => {
                adminCookie = res.headers['set-cookie'].pop().split(';')[0];
                finished();
            });
    });

    describe('/GET', () => {
        it('should GET all the resources when user is admin', (done) => {
            chai.request(server)
                .get('/api/trash')
                .set('Cookie', adminCookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        it('should not GET the resources when user is not an admin', (done) => {
            chai.request(server)
                .get('/api/trash')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });

});