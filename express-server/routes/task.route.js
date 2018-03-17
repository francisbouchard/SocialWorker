const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * Get all tasks by user
 */
router.get('/user/:user', (req, res) => {
    Task.find({user: req.params.user}).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a task by ID
 */
router.get('/id/:id', (req, res) => {
    Task.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new task
 */
router.post('/', (req, res) => {
    let housing = new Housing({
        name: req.body.name,
        user: req.body.user,
        participant: req.body.participant
    });
    housing.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

module.exports = router;