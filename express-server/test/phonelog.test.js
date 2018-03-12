const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Phonelog = require('../models/Phonelog');
const expect = chai.expect;

let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();
let id4 = new mongoose.Types.ObjectId();


let cookie;

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Phonelog Tests', () => {

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

        let phonelog1 = new Phonelog({
                '_id' : id1,
                'notes' : [
                    ''
                ],
                'date' : '2018-02-19T00:48:27.827Z',
                'deleted' : false,
                'name' : 'Adrianna',
                'pronouns' : '',
                'user' : '5a6ca05f54297a0c500cbd41',
                'urgent' : false,
                'phonenumber' : '',
                'subject' : 'Testing1',
                'createdAt' : '2018-02-19T00:48:28.903Z',
                'updatedAt' : '2018-02-19T00:48:28.903Z',
                '__v' : 0 
        });


        let phonelog2 = new Phonelog({
            '_id' : id2,
            'notes' : [
                'I am testing something'
            ],
            'date' : '2018-02-19T22:30:01.016Z',
            'deleted' : false,
            'name' : 'Adrianna',
            'pronouns' : 'she/her',
            'user' : '5a6ca05f54297a0c500cbd41',
            'urgent' : true,
            'phonenumber' : '(514) 848-2424',
            'subject' : 'Legal',
            'createdAt' : '2018-02-19T22:30:01.018Z',
            'updatedAt' : '2018-02-19T22:30:01.018Z',
            '__v' : 0
        });

        let phonelog3 = new Phonelog({
            '_id' : id3,
            'notes' : [
                'I am testing something again'
            ],
            'date' : '2018-03-19T22:30:01.016Z',
            'deleted' : false,
            'name' : 'Adrianna',
            'pronouns' : 'she/her',
            'user' : '5a6ca05f54297a0c500cbd41',
            'urgent' : true,
            'phonenumber' : '(514) 848-2424',
            'subject' : 'Legal',
            'createdAt' : '2018-02-19T22:30:01.018Z',
            'updatedAt' : '2018-02-19T22:30:01.018Z',
            '__v' : 0
        });

        phonelog1.save().then(data => { }, err => {
            console.log(err);
        });
        phonelog2.save().then(data => { }, err => {
            console.log(err);
        });
        phonelog3.save().then(data => { }, err => {
            console.log(err);
        });

    });

    describe('/GET', () => {
        it('should GET all phonelog', (done) => {
            chai.request(server)
                .get('/api/phonelog')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/active', () => {
        it('should get all phonelogs that are active', (done) => {
            chai.request(server)
                .get('/api/phonelog/active')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body).all.have.property('resolved', false);
                    expect(res.body).all.have.property('deleted', false);
                    done();
                });
        });
    })

    describe('/GET/deleted', () => {
        it('should get all phonelogs that are deleted', (done) => {
            chai.request(server)
                .get('/api/phonelog/deleted')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body).all.have.property('deleted', true);
                    done();
                });
        });
    })

    describe('/GET/resolved', () => {
        it('should get all phonelogs that are resolved', (done) => {
            chai.request(server)
                .get('/api/phonelog/resolved')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body).all.have.property('resolved', true);
                     expect(res.body).all.have.property('deleted', false);
                    done();
                });
        });
    })

    describe('/PUT/phonelog/:id', () => {
        it('should update (PUT) properties of the phonelog with given ID', (done) => {
            let name = "Random";
            let pronouns = "he";
            let phonenumber = "5146195888";
            let subject = "Testing123";
            let notes= ["hello"];
            let urgent = true ;
            let callertype = "social worker"
            let message = "call back"
            let date='2018-02-19T00:48:28.903Z'
            let language="English"
            chai.request(server)
                .put('/api/phonelog/'+id1)
                .set('Cookie', cookie)
                .send({ name: name, pronouns: pronouns, phonenumber:phonenumber, subject:subject, notes:notes, urgent:urgent,callertype:callertype,message:message,date:date,language:language })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name').eql(name);
                    res.body.should.have.property('pronouns').eql(pronouns);
                    res.body.should.have.property('phonenumber').eql(phonenumber);
                    res.body.should.have.property('subject').eql(subject);
                    res.body.should.have.property('notes').eql(notes);
                    res.body.should.have.property('urgent').eql(urgent);
                    res.body.should.have.property('callertype').eql(callertype);
                    res.body.should.have.property('message').eql(message);
                    res.body.should.have.property('date').eql(date);
                    res.body.should.have.property('language').eql(language);
                    done();
                });
        });
    });

    describe('/PUT/:id/deleted', () => {
        it('should update (PUT) deleted of the phonelog resource with given ID', (done) => {
            let deleted=true;
            chai.request(server)
                .put('/api/phonelog/'+ id3 +'/deleted')
                .set('Cookie', cookie)
                .send({delete:deleted})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    })

     describe('/PUT/:id/resolved', () => {
        it('should update (PUT) resolved property of the phonelog with given ID', (done) => {
            let resolved=true;
            let resolvedBy = "Random person";
            let dateResolved = "2018-02-19T00:48:28.903Z";
            chai.request(server)
                .put('/api/phonelog/'+id3+'/resolved')
                .set('Cookie', cookie)
                .send({resolved:resolved, resolvedBy: resolvedBy,dateResolved:dateResolved})
                .end((err, res) => {
                    res.should.have.status(200);
                   res.body.should.be.a('object');
                    res.body.should.have.property('nModified').eql(1);
                    done();
                });
        });
    });

   

    describe('/POST', () => {
        it('should POST a phonelog', (done) => {
            let phonelog = {
                user: id2,
                note: 'testing phonelog'
            }
            chai.request(server)
                .post('/api/phonelog')
                .set('Cookie', cookie)
                .send(phonelog)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user');
                    res.body.should.have.property('notes');
                    id4 = res.body._id;
                    done();
                });
        });
    });

    after(() => {
        Phonelog.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Phonelog.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
        Phonelog.findByIdAndRemove(id3).then(data => { }, err => {
            console.log(err);
        });
        Phonelog.findByIdAndRemove(id4).then(data => { }, err => {
            console.log(err);
        });
    });
});