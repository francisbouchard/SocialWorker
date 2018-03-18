const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Participant = require('../models/Participant');
const Housing = require('../models/Housing');
const CaseFile = require('../models/Casefile');

let participantId1 = new mongoose.Types.ObjectId();
let participantId2 = new mongoose.Types.ObjectId();
let housingId1 = new mongoose.Types.ObjectId();
let housingId2 = new mongoose.Types.ObjectId();
let userId = new mongoose.Types.ObjectId("5a7f87c0e146e233d707518b"); //test1 user
let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();
let id4 = null;
let id5 = new mongoose.Types.ObjectId();
let cookie;

chai.use(chaiHttp);

describe('Casefile Tests', () => {

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
        let participant1 = new Participant({
            _id: participantId1,
            name: 'reqParticipant1',
            email: 'reqParticipant1@email.com'
        });
        let participant2 = new Participant({
            _id: participantId2,
            name: 'reqParticipant2',
            email: 'reqParticipant2@email.com'
        });
        participant1.save().then(data => { }, err => {
            console.log(err);
        });
        participant2.save().then(data => { }, err => {
            console.log(err);
        });
        let housing1 = new Housing({
            _id: housingId1,
            name: 'Housing Facility for CaseFile Testing',
            term: '5 weeks'
        });
        let housing2 = new Housing({
            _id: housingId2,
            name: 'Housing Facility for CaseFile Testing 2',
            term: '2 months'
        });
        housing1.save().then(data => { }, err => {
            console.log(err);
        });
        housing2.save().then(data => { }, err => {
            console.log(err);
        });

        let casefile1 = new CaseFile({
            _id: id1,
            createdBy: userId,
            participant: participantId1,
            notes: 'testing',
            contactedResources: [{
                resource: housingId2,
                status: "pending",
                dateContacted: new Date(),
                note: "some note"
            }]
        });
        let casefile2 = new CaseFile({
            _id: id5,
            createdBy: userId,
            participant: participantId2,
            notes: 'testing'
        });
        casefile1.save().then(data => { }, err => {
            console.log(err);
        });
        casefile2.save().then(data => { }, err => {
            console.log(err);
        });
    });

    describe('/GET', () => {
        it('should GET all casefiles', (done) => {
            chai.request(server)
                .get('/api/casefile')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:id', () => {
        it('should GET a casefile with the given ID', (done) => {
            chai.request(server)
                .get('/api/casefile/' + id1)
                .set('Cookie', cookie)
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
                .get('/api/casefile/' + id2)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/GET/participant/:id', () => {
        it('should GET casefile with the given participant ID', (done) => {
            chai.request(server)
                .get('/api/casefile/participant/' + participantId1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
        it('should be empty for GET with nonexisting participant ID', (done) => {
            chai.request(server)
                .get('/api/casefile/participant/' + new mongoose.Types.ObjectId())
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET/:id/resource/:resId', () => {
        it('should GET the contacted resource of the casefile with the given casefile and resource IDs', (done) => {
            chai.request(server)
                .get('/api/casefile/' + id1 + '/resource/' + housingId2)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contactedResources');
                    res.body.contactedResources[0].should.have.property('resource');
                    res.body.contactedResources[0].should.have.property('isContacted');
                    res.body.contactedResources[0].should.have.property('dateContacted');
                    res.body.contactedResources[0].should.have.property('note');
                    done();
                });
        });
        it('should be empty for GET with nonexisting casefile ID', (done) => {
            chai.request(server)
                .get('/api/casefile/' + new mongoose.Types.ObjectId() + '/resource/' + housingId2)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
        it('should be empty for GET with nonexisting resource ID', (done) => {
            chai.request(server)
                .get('/api/casefile/' + id1 + '/resource/' + new mongoose.Types.ObjectId())
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/POST', () => {
        it('should not POST a casefile without a participant ID', (done) => {
            let casefile = { notes: 'testing notes' };
            chai.request(server)
                .post('/api/casefile')
                .set('Cookie', cookie)
                .send(casefile)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('participant');
                    res.body.errors.participant.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('should POST a casefile', (done) => {
            let casefile = {
                participant: participantId2,
                note: 'testing notes'
            }
            chai.request(server)
                .post('/api/casefile')
                .set('Cookie', cookie)
                .send(casefile)
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
        it('should not add a contacted resource with an invalid casefile ID', (done) => {
            let contactedResource = {
                resourceId: housingId1,
                status: 'pending'
            }
            chai.request(server)
                .post('/api/casefile/' + id3 + '/resource')
                .set('Cookie', cookie)
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
                status: 'pending'
            }
            chai.request(server)
                .post('/api/casefile/' + id1 + '/resource')
                .set('Cookie', cookie)
                .send(contactedResource)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('err');
                    done();
                });
        });
        it('should add a contacted resource to the casefile with the given ID', (done) => {
            let contactedResource = {
                resourceId: housingId1,
                status: 'pending'
            }
            chai.request(server)
                .post('/api/casefile/' + id1 + '/resource')
                .set('Cookie', cookie)
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
        it('should not update contacted resource details with an invalid casefile ID', (done) => {
            let contactedResource = {
                resourceId: housingId2,
                status: "contacted",
                dateContacted: new Date()
            }
            chai.request(server)
                .put('/api/casefile/' + id3 + '/resource/' + housingId2)
                .set('Cookie', cookie)
                .send(contactedResource)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should not update contacted resource details with an invalid resource ID', (done) => {
            chai.request(server)
                .put('/api/casefile/' + id1 + '/resource/' + new mongoose.Types.ObjectId())
                .set('Cookie', cookie)
                .send({ status: 'accepted' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should update the details of a contacted resource given casefile and resource IDs', (done) => {
            chai.request(server)
                .put('/api/casefile/' + id1 + '/resource/' + housingId2)
                .set('Cookie', cookie)
                .send({ status: 'accepted' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

    describe('/PUT/:id/selection', () => {
        it('should not update a casefile with an invalid ID', (done) => {
            chai.request(server)
                .put('/api/casefile/' + id3 + '/selection')
                .set('Cookie', cookie)
                .send({ status: 'finalized' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should update the selected resource of the casefile with the given ID', (done) => {
            chai.request(server)
                .put('/api/casefile/' + id1 + '/selection')
                .set('Cookie', cookie)
                .send({ selectedResource: housingId1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

    describe('/PUT/:id/status', () => {
        it('should not update a casefile with an invalid ID', (done) => {
            chai.request(server)
                .put('/api/casefile/' + id3 + '/status')
                .set('Cookie', cookie)
                .send({ status: 'finalized' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(0);
                    done();
                });
        });
        it('should update the status of the casefile with the given ID', (done) => {
            chai.request(server)
                .put('/api/casefile/' + id1 + '/status')
                .set('Cookie', cookie)
                .send({ status: 'finalized' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

    describe('/DELETE/:id', () => {
        it('should flag the casefile with the given ID as deleted', (done) => {
            chai.request(server)
                .del('/api/casefile/' + id5)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deleted').eql(true);
                    done();
                });
        });
    });

    after(() => {
        CaseFile.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        CaseFile.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
        CaseFile.findByIdAndRemove(id4).then(data => { }, err => {
            console.log(err);
        });
        CaseFile.findByIdAndRemove(id5).then(data => { }, err => {
            console.log(err);
        });
        Participant.findByIdAndRemove(participantId1).then(data => { }, err => {
            console.log(err);
        });
        Participant.findByIdAndRemove(participantId2).then(data => { }, err => {
            console.log(err);
        });
        Housing.findByIdAndRemove(housingId1).then(data => { }, err => {
            console.log(err);
        });
        Housing.findByIdAndRemove(housingId2).then(data => { }, err => {
            console.log(err);
        });
    });
});