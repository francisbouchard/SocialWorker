const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const Users = require('../models/Users');


chai.use(chaiHttp);

var Cookies;

describe('User Tests', () => {
    describe('Register', () => {
        it('should register a user', (done) => {
            chai.request(server)
                .post('/user/signup')
                .send({
                    "email": "testing@test.com",
                    "password": "hunter1",
                    "confirmPassword": "hunter1"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Login', () => {
        it('should login a user', (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                    "email": "testing@test.com",
                    "password": "hunter1"
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
        it("should delete a user's account", (done) => {
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
        Users.find({email: 'testing@test.com'}).remove().then(data => {
            console.log("CLEANUP:");
            console.log("Test user successfully removed");
        }, err => {
            console.log(err);
        });
    });
})