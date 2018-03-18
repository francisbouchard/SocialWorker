const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Housing = require('../models/resources/Housing');

let id1 = new mongoose.Types.ObjectId();
let id2 = null;
let id3 = new mongoose.Types.ObjectId();
let id4 = new mongoose.Types.ObjectId();
let cookie;

chai.use(chaiHttp);

describe('Housing Resources Tests', () => {

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
        let housing1 = new Housing({
            _id: id1,
            name: 'Housing Facility Name',
            email: 'housing@resource.com',
            phone: '514-1234567',
            location: 'the location',
            term: '15 weeks',
            constraints: ['some constraints']
        });
        let housing2 = new Housing({
            _id: id4,
            name: 'Housing Facility 4 Name',
            email: 'housing4@resource.com',
            term: '5 weeks'
        });
        housing1.save().then(data => { }, err => {
            console.log(err);
        });
        housing2.save().then(data => { }, err => {
            console.log(err);
        });
    });



    describe('/GET/housing', () => {
        it('should GET all the Housing resources', (done) => {
            chai.request(server)
                .get('/api/resource/housing')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST/housing', () => {
        it('should not POST a Housing resource without a name', (done) => {
            let housing = {
                email: 'housing2@resource.com',
                phone: '514-1234567'
            }
            chai.request(server)
                .post('/api/resource/housing')
                .set('Cookie', cookie)
                .send(housing)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('should POST a Housing resource', (done) => {
            let housing = {
                name: 'Housing Facility 2 Name',
                email: 'housing2@resource.com',
                phone: '514-1234567',
                term: '2 months'
            }
            chai.request(server)
                .post('/api/resource/housing')
                .set('Cookie', cookie)
                .send(housing)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('phone');
                    res.body.should.have.property('term');
                    id2 = res.body._id;
                    done();
                });
        });
    });

    describe('/PUT/housing/:id', () => {
        it('should update (PUT) properties of the Housing resource with given ID', (done) => {
            let notes = 'Housing Facility Notes';
            let term = '4 months';
            chai.request(server)
                .put('/api/resource/housing/' + id1)
                .set('Cookie', cookie)
                .send({ notes: notes, term: term })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('notes').eql(notes);
                    res.body.should.have.property('term').eql(term);
                    done();
                });
        });
    });


    after(() => {
        Housing.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Housing.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
        Housing.findByIdAndRemove(id4).then(data => { }, err => {
            console.log(err);
        });
    });
});