const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * Get all tasks by user
 */
router.get('/user', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }

    Task.find({ user: req.user._id }).then(data => {
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
    let task = new Task({
        description: req.body.description,
        deadline: req.body.deadline,
        user: req.user._id,
        participant: req.body.participant
    });
    task.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Delete a task with the given ID (permanent)
 */
router.delete('/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    });
})

module.exports = router;