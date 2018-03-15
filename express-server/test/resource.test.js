const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Resource = require('../models/Resource');

let id1 = new mongoose.Types.ObjectId();
let id2 = null;
let id3 = new mongoose.Types.ObjectId();
let id4 = new mongoose.Types.ObjectId();
let cookie;

chai.use(chaiHttp);

describe('Plain Basic Resources Tests', () => {

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
        let resource1 = new Resource({
            _id: id1,
            name: 'Plain Resource Name 1',
            email: 'resource@resource.com',
            phone: '514-1234567',
            location: 'the location',
        });
        let resource2 = new Resource({
            _id: id4,
            name: 'Plain Resource Name 2',
            email: 'plain@resource.com',
        });
        resource1.save().then(data => { }, err => {
            console.log(err);
        });
        resource2.save().then(data => { }, err => {
            console.log(err);
        });
    });

    describe('/GET', () => {
        it('should GET all the resources', (done) => {
            chai.request(server)
                .get('/api/resource')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    

    describe('/GET/id/:id', () => {
        it('should GET a resource with the given ID', (done) => {
            chai.request(server)
                .get('/api/resource/id/' + id1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('phone');
                    res.body.should.have.property('location');
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/api/resource/id/' + id3)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    })

    

    describe('/DELETE/:id', () => {
        it('should not permanently DELETE the resource with the given ID when user is not admin', (done) => {
            chai.request(server)
                .del('/api/resource/' + id4)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deleted').eql(true);
                    done();
                });
        });
        it('should permanently DELETE the resource with the given ID when user is admin', (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                    'email': 'test2@test.com',
                    'password': 'test123'
                })
                .end((err, res) => {
                    let adminCookie = res.headers['set-cookie'].pop().split(';')[0];
                    chai.request(server)
                        .del('/api/resource/' + id4)
                        .set('Cookie', adminCookie)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    after(() => {
        Resource.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Resource.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
    });
});