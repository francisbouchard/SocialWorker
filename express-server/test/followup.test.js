const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Followup = require('../models/Followup');

let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();
let cookie;

chai.use(chaiHttp);

describe('Followup Tests', () => {

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
        let followup1 = new Followup({
            _id: id1,
            description: 'Testing followup',
            user: 'test1',
            participant: id1
        });
        let followup2 = new Followup({
            _id: id2,
            description: 'Testing followup',
            user: 'test2',
            participant: id2
        });
        followup1.save().then(data => { }, err => {
            console.log(err);
        });
        followup2.save().then(data => { }, err => {
            console.log(err);
        });
    });

    describe('/GET/user', () => {
        it('should not proceed with GET when user ID not provided through the cookie', (done) => {
            chai.request(server)
                .get('/api/followup')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it('should GET all followups for the requesting user', (done) => {
            chai.request(server)
                .get('/api/followup/user')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:id', () => {
        it('should GET a followup with the given ID', (done) => {
            chai.request(server)
                .get('/api/followup/' + id1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/api/followup/' + id3)
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
        it('should POST a new followup', (done) => {
            let followup = {
                description: 'Another followup'
            }
            chai.request(server)
                .post('/api/followup')
                .set('Cookie', cookie)
                .send(followup)
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
        it('should permanently DELETE the followup with the given ID', (done) => {
            chai.request(server)
                .del('/api/followup/' + id2)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        Followup.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Followup.findByIdAndRemove(id4).then(data => { }, err => {
            console.log(err);
        });
    });
});