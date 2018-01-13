const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Participant = require('../models/Participant');
const Housing = require('../models/Housing');
const Request = require('../models/Request');

let participantId1 = "reqParticipant1";
let participantId2 = "reqParticipant2";
let housingId1 = new mongoose.Types.ObjectId();
let housingId2 = new mongoose.Types.ObjectId();
let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();
let id4 = null;
let id5 = new mongoose.Types.ObjectId();

chai.use(chaiHttp);

describe('Request Tests', () => {

    before(() => {
        let participant1 = new Participant({
            _id: participantId1,
            name: "participant1",
            email: "participant1@email.com"
        });
        let participant2 = new Participant({
            _id: participantId2,
            name: "participant2",
            email: "participant2@email.com"
        });
        participant1.save().then(data => { }, err => {
            console.log(err);
        });
        participant2.save().then(data => { }, err => {
            console.log(err);
        });
        let housing1 = new Housing({
            _id: housingId1,
            name: "Housing Facility for Request Testing",
            term: "5 weeks"
        });
        let housing2 = new Housing({
            _id: housingId2,
            name: "Housing Facility for Request Testing 2",
            term: "2 months"
        });
        housing1.save().then(data => {}, err => {
            console.log(err);
        });
        housing2.save().then(data => {}, err => {
            console.log(err);
        });

        let request1 = new Request({
            _id: id1,
            participant: participantId1,
            notes: "testing",
            contactedResources: {
                _id: housingId2,
                status: "pending"
            }
        });
        let request2 = new Request({
            _id: id5,
            participant: participantId2,
            notes: "testing"
        });
        request1.save().then(data => { }, err => {
            console.log(err);
        });
        request2.save().then(data => { }, err => {
            console.log(err);
        });
    });

    describe('/GET', () => {
        it('should GET all requests', (done) => {
            chai.request(server)
                .get('/request')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:id', () => {
        it('should GET a request with the given ID', (done) => {
            chai.request(server)
                .get('/request/' + id1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('participant');
                    res.body.should.have.property('notes');
                    res.body.should.have.property('contactedResources');
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/request/' + id2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/GET/participant/:id', () => {
        it('should GET requests with the given participant ID', (done) => {
            chai.request(server)
                .get('/request/participant/' + participantId1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
        it('should be empty for GET with nonexisting participant ID', (done) => {
            chai.request(server)
                .get('/request/participant/' + 'p123')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET/:id/resource/:resId', () => {
        it('should GET the contacted resource of the request with the given request and resource IDs', (done) => {
            chai.request(server)
                .get('/request/' + id1 + '/resource/' + housingId2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('participant');
                    res.body.should.have.property('notes');
                    res.body.should.have.property('contactedResources');
                    done();
                });
        });
        it('should be empty for GET with nonexisting request ID', (done) => {
            chai.request(server)
                .get('/request/' + new mongoose.Types.ObjectId() + '/resource/' + housingId2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
        it('should be empty for GET with nonexisting resource ID', (done) => {
            chai.request(server)
                .get('/request/' + id1 + '/resource/' + new mongoose.Types.ObjectId())
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/POST', () => {
        it('should not POST a request without a participant ID', (done) => {
            let request = {notes: "testing notes"};
            chai.request(server)
                .post('/request')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('participant');
                    res.body.errors.participant.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('should POST a request', (done) => {
            let request = {
                participant: participantId2,
                note: "testing notes"
            }
            chai.request(server)
                .post('/request')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('participant');
                    res.body.should.have.property('notes');
                    id4 = res.body._id;
                    done();
                });
        });
    });

    describe('/POST/:id/resource', () => {
        it('should not add a contacted resource with an invalid request ID', (done) => {
            let contactedResource = {
                resourceId: housingId1,
                status: "pending"
            }
            chai.request(server)
                .post('/request/' + id3 + '/resource')
                .send(contactedResource)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should not add a contacted resource with an invalid resource ID', (done) => {
            let contactedResource = {
                resourceId: new mongoose.Types.ObjectId(),
                status: "pending"
            }
            chai.request(server)
                .post('/request/' + id1 + '/resource')
                .send(contactedResource)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('err');
                    done();
                });
        });
        it('should add a contacted resource to the request with the given ID', (done) => {
            let contactedResource = {
                resourceId: housingId1,
                status: "pending"
            }
            chai.request(server)
                .post('/request/' + id1 + '/resource')
                .send(contactedResource)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

    describe('/PUT/:id/resource/:resId', () => {
        it('should not update a contacted resource with an invalid request ID', (done) => {
            let contactedResource = {
                resourceId: housingId1,
                status: "pending"
            }
            chai.request(server)
                .put('/request/' + id3 + '/resource/' + housingId1)
                .send(contactedResource)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should not update a contacted resource with an invalid resource ID', (done) => {
            chai.request(server)
                .put('/request/' + id1 + '/resource/' + new mongoose.Types.ObjectId())
                .send({status: "accepted"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should update the status of a contacted resource given request and resource IDs', (done) => {
            chai.request(server)
                .put('/request/' + id1 + '/resource/' + housingId1)
                .send({status: "accepted"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

    describe('/PUT/:id/status', () => {
        it('should not update a request with an invalid ID', (done) => {
            chai.request(server)
                .put('/request/' + id3 + '/status')
                .send({status: "finalized"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should update the status of the request with the given ID', (done) => {
            chai.request(server)
                .put('/request/' + id1 + '/status')
                .send({status: "finalized"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

    describe('/DELETE/:id', () => {
        it('should DELETE the request with the given ID', (done) => {
            chai.request(server)
                .del('/request/' + id5)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        Request.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Request.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
        Request.findByIdAndRemove(id4).then(data => { }, err => {
            console.log(err);
        });
        Participant.findByIdAndRemove(participantId1).then(data => {}, err => {
            console.log(err);
        });
        Participant.findByIdAndRemove(participantId2).then(data => {}, err => {
            console.log(err);
        });
        Housing.findByIdAndRemove(housingId1).then(data => {}, err => {
            console.log(err);
        });
        Housing.findByIdAndRemove(housingId2).then(data => {}, err => {
            console.log(err);
        });
    });
});