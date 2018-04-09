const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');


/**
 * Get all meetings 
 */
router.get('/', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Meeting.find().populate('users').then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Meeting by ID
 */
router.get('/id/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Meeting.findById(req.params.id)
        .populate('users')
        .then(data => {
            res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get meeting by participant ID
 */
router.get('/participant/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Meeting.find({ deleted: { $ne: true }, participant: req.params.id })
        .populate('users')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});
/**
 * Get meeting by user ID
 */
router.get('/user', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Meeting.find({ deleted: { $ne: true }, user: req.user._id })
        .populate('users')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/*
* Create a meeting
*/

router.post('/', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    let meeting = new Meeting({
        minutes: req.body.description,
        date: req.body.date,
        users: req.body.users,
    })
    meeting.save().then(data => {
        res.send(data);
    }, err => {
        res.status(500).send(err);
    })
});

/**
 * Delete a meeting with the given ID
 */
router.delete('/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Meeting.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.status(500).send(err);
    });
})

module.exports = router;