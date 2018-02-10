const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const Users = require('../models/User');


chai.use(chaiHttp);

var Cookies;

describe('User Tests', () => {
    describe('Register', () => {
        it('should register a user via a logged in admin', (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                    'email': 'test2@test.com',
                    'password': 'test123'
                })
                .end((err, res) => {
                    let adminCookie = res.headers['set-cookie'].pop().split(';')[0];
                    chai.request(server)
                        .post('/user/signup')
                        .set('Cookie', adminCookie)
                        .send({
                            'email': 'testing@test.com',
                            'password': 'hunter1',
                            'confirmPassword': 'hunter1'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    describe('Login', () => {
        it('should login a user', (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                    'email': 'testing@test.com',
                    'password': 'hunter1'
                })
                .end((err, res) => {
                    res.should.have.cookie('connect.sid');
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Delete Account', () => {
        it('should delete a user\'s account', (done) => {
            chai.request(server)
                .delete('/user')
                .set('Cookie', Cookies)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        Users.find({ email: 'testing@test.com' }).remove().then(data => {
            console.log('CLEANUP:');
            console.log('Test user successfully removed');
        }, err => {
            console.log(err);
        });
    });
})