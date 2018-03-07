const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Housing = require('../models/Housing');

let id1 = new mongoose.Types.ObjectId();
let id2 = null;
let id3 = new mongoose.Types.ObjectId();
let id4 = new mongoose.Types.ObjectId();
let cookie;
let adminCookie;

chai.use(chaiHttp);

describe('Housing Resources Tests', () => {

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
        it('should GET all the resources', (done) => {
            chai.request(server)
                .get('/api/trash')
                .set('Cookie', adminCookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});