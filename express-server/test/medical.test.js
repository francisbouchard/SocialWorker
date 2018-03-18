const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Medical = require('../models/resources/Medical');

let id1 = new mongoose.Types.ObjectId();
let id2 = null;
let cookie;

chai.use(chaiHttp);

describe('Medical Resources Tests', () => {

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
        let medical1 = new Medical({
            _id: id1,
            name: 'Medical Resource Name 1',
            email: 'medical1@resource.com',
            phone: '(514) 848-2424',
            location: 'some location',
            schedule_availability: ['Monday 17:00-21:00','Wednesday 12:00-16:00'],
            without_cost: true,
            waitlist_time: 'walk-in'
        });
        medical1.save().then(data => { }, err => {
            console.log(err);
        });
    });



    describe('/GET/medical', () => {
        it('should GET all the Medical resources', (done) => {
            chai.request(server)
                .get('/api/resource/medical')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });


    describe('/POST/medical', () => {
        it('should not POST a Medical resource without a name', (done) => {
            let medical = {
                email: 'medical2@resource.com',
                phone: '514-1234567'
            }
            chai.request(server)
                .post('/api/resource/medical')
                .set('Cookie', cookie)
                .send(medical)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('should POST a Medical resource', (done) => {
            let medical = {
                name: 'Medical Facility 2 Name',
                email: 'medical2@resource.com',
                phone: '514-1234567',
                waitlist_time: '2 months'
            }
            chai.request(server)
                .post('/api/resource/medical')
                .set('Cookie', cookie)
                .send(medical)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('phone');
                    res.body.should.have.property('waitlist_time');
                    id2 = res.body._id;
                    done();
                });
        });
    });

    describe('/PUT/medical/:id', () => {
        it('should update (PUT) properties of the Medical resource with given ID', (done) => {
            let notes = 'Medical Facility Notes';
            let waitlist_time = '6 months';
            chai.request(server)
                .put('/api/resource/medical/' + id1)
                .set('Cookie', cookie)
                .send({ notes: notes, waitlist_time: waitlist_time })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('notes').eql(notes);
                    res.body.should.have.property('waitlist_time').eql(waitlist_time);
                    done();
                });
        });
    });


    after(() => {
        Medical.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Medical.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
    });
});