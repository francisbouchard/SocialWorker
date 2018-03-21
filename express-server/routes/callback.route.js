const express = require('express');
const router = express.Router();
const Callback = require('../models/Callback');


/**
 * Get all callbacks 
 */
router.get('/', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Callback.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Calback by ID
 */
router.get('/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Callback.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get callback by participant ID
 */
router.get('/participant/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Callback.find({ deleted: { $ne: true }, participant: req.params.id })
        .populate('participant')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});
/**
 * Get callback by user ID
 */
router.get('/participant/user', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Callback.find({ deleted: { $ne: true }, user: req.user._id })
        .populate('participant')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/*
* Create a callback
*/

router.post('/participant', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    let callback = new Callback({
        description: req.body.description,
        date: req.body.date,
        user: req.user._id,
        participant: req.body.participant
    })
    callback.save().then(data => {
        res.send(data);
    }, err => {
        res.status(500).send(err);
    })
});

/**
 * Delete a callback with the given ID
 */
router.delete('/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Callback.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.status(500).send(err);
    });
})

module.exports = router;