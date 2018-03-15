const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Participant = require('../models/Participant');
const Housing = require('../models/resources/Housing');
const Casefile = require('../models/Casefile');

let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();

let cookie;
let adminCookie;

chai.use(chaiHttp);

describe('Trash Tests', () => {

    before(() => {
        let participantRecord = new Participant({
            _id: id1,
            name: 'Participant Record',
            pronouns: 'she/her',
            email: 'participantrecord@p.com',
            deleted: true
        });
        let housingRecord = new Housing({
            _id: id2,
            name: 'Housing Record for Trash',
            email: 'housingrecord@resource.com',
            term: '5 weeks',
            deleted: true
        });
        let casefileRecord = new Casefile({
            _id: id3,
            participant: id1,
            notes: 'testing'
        });
        participantRecord.save().then(data => {
            casefileRecord.save().then(data => { }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
        housingRecord.save().then(data => { }, err => {
            console.log(err);
        })
    });

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

    describe('/PUT/:model/:id', () => {
        it('should not restore the record with the given ID if user is not admin', (done) => {
            chai.request(server)
                .put('/api/trash/Casefile/' + id3)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
        it('should restore the record with the given ID (deleted = false)', (done) => {
            chai.request(server)
                .put('/api/trash/Casefile/' + id3)
                .set('Cookie', adminCookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deleted').eql(false);
                    done();
                });
        });
    });

    describe('/DELETE/:model/:id', () => {
        it('should not permanently DELETE the record with the given ID when user is not admin', (done) => {
            chai.request(server)
                .del('/api/trash/Participant/' + id1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
        it('should permanently DELETE the record with the given ID when user is admin', (done) => {
            chai.request(server)
                .del('/api/trash/Participant/' + id1)
                .set('Cookie', adminCookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('should permanently DELETE the record (same as previous test but with different model)', (done) => {
            chai.request(server)
                .del('/api/trash/Resource/' + id2)
                .set('Cookie', adminCookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        Casefile.findByIdAndRemove(id3).then(data => { }, err => {
            console.log(err);
        });
    });

});