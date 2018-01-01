const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const Participant = require('../models/Participant');

let id1 = "participant1";
let id2 = "participant2";

chai.use(chaiHttp);

describe('Participant Tests', () => {

    describe('/GET', () => {
        it('should GET all the participants', (done) => {
            chai.request(server)
                .get('/participant')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:pid', () => {
        it('should GET a participant with the given ID', (done) => {
            chai.request(server)
                .get('/participant/' + id1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    //TODO
                    //res.body.should.have.property('_id');
                    //Uncomment this line when implemented

                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('phone');
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/participant/' + 'p123')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    })

    describe('/POST', () => {
        it('should not POST a participant without _id', (done) => {
            let participant = {
                name: "participant",
                email: "participant@p.com",
                phone: "514-1234567"
            }
            chai.request(server)
                .post('/participant')
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
                name: "participant",
                email: "participant2@p.com",
                phone: "514-1234567"
            }
            chai.request(server)
                .post('/participant')
                .send(participant)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('phone');
                    done();
                });
        });
        it('should POST a document to given participant', (done) => {
            let document = {
                type: "A123 Form",
                attachment: "url"
            }
            Participant.findById(id1).then(participant => {
                let numOfDocs = participant.documents.length;
                chai.request(server)
                .post('/participant/' + id1 + '/doc')
                .send(document)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('documents');
                    res.body.documents.length.should.be.eql(numOfDocs+1);
                    done();
                });
            })
        });
        it('should POST a note to given participant', (done) => {
            let note = {
                text: "notes taken",
                attachment: "url"
            }
            Participant.findById(id1).then(participant => {
                let numOfNotes = participant.notes.length;
                chai.request(server)
                .post('/participant/' + id1 + '/note')
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('notes');
                    res.body.notes.length.should.be.eql(numOfNotes+1);
                    done();
                });
            })
        });
    });

    after(() => {
        Participant.findByIdAndRemove(id2).then(data => {
            console.log("CLEANUP:");
            console.log(id2 + " successfully removed");
        }, err => {
            console.log(err);
        });
    });
});