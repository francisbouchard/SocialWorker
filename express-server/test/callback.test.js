const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Callback = require('../models/Callback');

let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();
let cookie;

chai.use(chaiHttp);

describe('Callback Tests', () => {

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
        let callback1 = new Callback({
            _id: id1,
            description: 'Testing callback',
            user: 'test1',
            participant: id1
        });
        let callback2 = new Callback({
            _id: id2,
            description: 'Testing callback',
            user: 'test2',
            participant: id2
        });
        callback1.save().then(data => { }, err => {
            console.log(err);
        });
        callback2.save().then(data => { }, err => {
            console.log(err);
        });
    });

    describe('/GET/user', () => {
        it('should not proceed with GET when user ID not provided through the cookie', (done) => {
            chai.request(server)
                .get('/api/callback/')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it('should GET all callbacks for the requesting user', (done) => {
            chai.request(server)
                .get('/api/callback/user')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:id', () => {
        it('should GET a callback with the given ID', (done) => {
            chai.request(server)
                .get('/api/callback/' + id1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('description');
                    res.body.should.have.property('user');
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/api/callback/' + id3)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    })
    describe('/POST', () => {
        it('should POST a new callback', (done) => {
            let callback = {
                description: 'Another callback'
            }
            chai.request(server)
                .post('/api/callback')
                .set('Cookie', cookie)
                .send(callback)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('description');
                    res.body.should.have.property('user');
                    id4 = res.body._id;
                    done();
                });
        });
    });

    describe('/DELETE/:id', () => {
        it('should permanently DELETE the callback with the given ID', (done) => {
            chai.request(server)
                .del('/api/callback/' + id2)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        Callback.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Callback.findByIdAndRemove(id4).then(data => { }, err => {
            console.log(err);
        });
    });
});