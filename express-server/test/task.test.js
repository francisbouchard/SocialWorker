const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const Task = require('../models/Task');

let id1 = new mongoose.Types.ObjectId();
let id2 = new mongoose.Types.ObjectId();
let id3 = new mongoose.Types.ObjectId();
let cookie;

chai.use(chaiHttp);

describe('Tasks Tests', () => {

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
        let task1 = new Task({
            _id: id1,
            description: 'Testing task to do',
            user: 'test1'
        });
        let task2 = new Task({
            _id: id2,
            description: 'Testing task 2 to do',
            user: 'test2'
        });
        task1.save().then(data => { }, err => {
            console.log(err);
        });
        task2.save().then(data => { }, err => {
            console.log(err);
        });
    });

    describe('/GET', () => {
        it('should GET all tasks for a user', (done) => {
            chai.request(server)
                .get('/api/task/user/' + 'test1')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:id', () => {
        it('should GET a task with the given ID', (done) => {
            chai.request(server)
                .get('/api/task/id/' + id1)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('description');
                    res.body.should.have.property('user');
                    done();
                });
        });
        it('should be empty for GET with nonexisting ID', (done) => {
            chai.request(server)
                .get('/api/task/id/' + id3)
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.empty;
                    done();
                });
        });
    })

    after(() => {
        Task.findByIdAndRemove(id1).then(data => { }, err => {
            console.log(err);
        });
        Task.findByIdAndRemove(id2).then(data => { }, err => {
            console.log(err);
        });
    });
});