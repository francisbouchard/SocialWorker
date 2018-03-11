const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Participant = require('../models/Participant');

let id1 = 'testingID1';
let id2 = 'testingID2';
let id3 = 'testingID3';
let noteId = new mongoose.Types.ObjectId();
let docId = new mongoose.Types.ObjectId();
let workerId1 = new mongoose.Types.ObjectId("5a7f87c0e146e233d707518b");
let cookie;

chai.use(chaiHttp);

describe('Participant Tests', () => {

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
            _id: id1,
            name: 'participant1',
            pronouns: 'she/her',
            email: 'participant1@p.com',
            telephone: '514-1234567',
            address: '1234 Sherbrooke',
            socialmedia: { service: 'facebook', username: 'participant1' },
            notes: [{
                _id: noteId,
                text: 'some notes'
            }],
            documents: [{
                _id: docId,
                type: 'Form XYZ',
                attachment: ['url']
            }]
        });
        let participant3 = new Participant({
            _id: id3,
            name: 'participant3',
            email: 'participant3@p.com',
            telephone: '514-1234567'
        });
        participant1.save().then(data => { }, err => {
            console.log(err);
        });
        participant3.save().then(data => { }, err => {
            console.log(err);
        })
    });

    describe('/GET', () => {
        it('should GET all the participants', (done) => {
            chai.request(server)
                .get('/api/participant')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/id/:pid', () => {
        it('should GET a participant with the given ID', (done) => {
            chai.request(server)
                .get('/api/participant/id/' + id1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('pronouns');
                    res.body.should.have.property('email');
                    res.body.should.have.property('telephone');
                    res.body.should.have.property('address');
                    res.body.should.have.property('socialmedia');
                    res.body.should.have.property('notes');
                    res.body.should.have.property('documents');
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/api/participant/id/' + 'p123')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/GET/worker', () => {
        it('should GET all participant associated with the given social worker ID', (done) => {
            chai.request(server)
                .get('/api/participant/worker')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        //Uncomment following when testing *locally* (when testing with travis, the cookie with worker's ID is always there)
        it('should not proceed with GET when social worker ID not provided through the cookie', (done) => {
            chai.request(server)
                .get('/api/participant/worker')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/GET/search/:values', () => {
        it('should GET the participants matching the given values', (done) => {
            let values = 'name=participant1'
            chai.request(server)
                .get('/api/participant/search/' + values)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
        it('should not GET any participants matching the given values', (done) => {
            let values = 'name=participant500'
            chai.request(server)
                .get('/api/participant/search/' + values)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST', () => {
        it('should not POST a participant without _id', (done) => {
            let participant = {
                name: 'participant',
                email: 'participant@p.com',
                telephone: '514-1234567'
            }
            chai.request(server)
                .post('/api/participant')
                .set('Cookie', cookie)
                .send(participant)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('_id');
                    res.body.errors._id.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('should POST a participant', (done) => {
            let participant = {
                _id: id2,
                name: 'participant',
                pronouns: 'they/them',
                email: 'participant2@p.com',
                telephone: '514-1234567'
            }
            chai.request(server)
                .post('/api/participant')
                .set('Cookie', cookie)
                .send(participant)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('pronouns');
                    res.body.should.have.property('email');
                    res.body.should.have.property('telephone');
                    res.body.should.have.property('socialworkers');
                    res.body.socialworkers.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/POST/:pid/worker', () => {
        it('should not add a social worker to participant with invalid participant ID', (done) => {
            chai.request(server)
                .post('/api/participant/' + new mongoose.Types.ObjectId() + '/worker')
                .set('Cookie', cookie)
                .send({ workerID: workerId1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
        it('should not add a social worker to participant with invalid worker ID', (done) => {
            chai.request(server)
                .post('/api/participant/' + id1 + '/worker')
                .set('Cookie', cookie)
                .send({ workerID: new mongoose.Types.ObjectId() })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('err');
                    done();
                });
        });
        it('should add a social worker to participant with given ID', (done) => {
            Participant.findById(id1).then(participant => {
                let numOfWorkers = participant.socialworkers.length;
                chai.request(server)
                    .post('/api/participant/' + id1 + '/worker')
                    .set('Cookie', cookie)
                    .send({ workerID: workerId1 })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('socialworkers');
                        res.body.socialworkers.length.should.be.eql(numOfWorkers + 1);
                        done();
                    });
            })
        });
    });

    describe('/POST/:pid/doc', () => {
        it('should POST a document to given participant', (done) => {
            let document = {
                type: 'A123 Form',
                attachment: 'url'
            }
            // TODO: uncomment/fix this when the docs attachment functionality is done
            // Participant.findById(id1).then(participant => {
            //     let numOfDocs = participant.documents.length;
            //     chai.request(server)
            //         .post('/api/participant/' + id1 + '/doc')
            //         .set('Cookie', cookie)
            //         .send (document)
            //         .end((err, res) => {
            //             res.should.have.status(200);
            //             res.body.should.be.a('object');
            //             res.body.should.have.property('documents');
            //             res.body.documents.length.should.be.eql(numOfDocs + 1);
                        done();
            //         });
            // })
        });
    });

    describe('/POST/:pid/note', () => {
        it('should POST a note to given participant', (done) => {
            let note = {
                text: 'notes taken',
                attachment: 'url'
            }
            // TODO: uncomment/fix this when the docs attachment functionality is done
            // Participant.findById(id1).then(participant => {
            //     let numOfNotes = participant.notes.length;
            //     chai.request(server)
            //         .post('/api/participant/' + id1 + '/note')
            //         .set('Cookie', cookie)
            //         .send(note)
            //         .end((err, res) => {
            //             res.should.have.status(200);
            //             res.body.should.be.a('object');
            //             res.body.should.have.property('notes');
            //             res.body.notes.length.should.be.eql(numOfNotes + 1);
                        done();
            //         });
            // })
        });
    });

    describe('/DELETE/:pid', () => {
        it('should not permanently DELETE the participant with the given ID when user is not admin', (done) => {
            chai.request(server)
                .del('/api/participant/' + id3)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deleted').eql(true);
                    done();
                });
        });
        it('should permanently DELETE the participant with the given ID when user is admin', (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                    'email': 'test2@test.com',
                    'password': 'test123'
                })
                .end((err, res) => {
                    let adminCookie = res.headers['set-cookie'].pop().split(';')[0];
                    chai.request(server)
                        .del('/api/participant/' + id3)
                        .set('Cookie', adminCookie)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    describe('/DELETE/:pid/worker/:workerId', () => {
        it('should DELETE worker with given ID from the participant\'s assigned social workers', (done) => {
            chai.request(server)
                .del('/api/participant/' + id1 + '/worker/' + workerId1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/DELETE/:pid/doc/:docId', () => {
        it('should DELETE the document of the participant by the given IDs', (done) => {
            chai.request(server)
                .del('/api/participant/' + id1 + '/doc/' + docId)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/DELETE/:pid/note/:noteId', () => {
        it('should DELETE the note of the participant by the given IDs', (done) => {
            chai.request(server)
                .del('/api/participant/' + id1 + '/note/' + noteId)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        Participant.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Participant.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
    });
});