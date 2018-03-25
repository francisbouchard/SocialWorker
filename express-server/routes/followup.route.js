const express = require('express');
const router = express.Router();
const Followup = require('../models/Followup');


/**
 * Get all followups 
 */
router.get('/', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Followup.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Followup by ID
 */
router.get('/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Followup.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get followup by participant ID
 */
router.get('/participant/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Followup.find({ deleted: { $ne: true }, participant: req.params.id })
        .populate('participant')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});
/**
 * Get followup by user ID
 */
router.get('/participant/user', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Followup.find({ deleted: { $ne: true }, user: req.user._id })
        .populate('participant')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/*
* Create a followup
*/

router.post('/participant', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    let followup = new Followup({
        description: req.body.description,
        date: req.body.date,
        user: req.user._id,
        participant: req.body.participant
    })
    followup.save().then(data => {
        res.send(data);
    }, err => {
        res.status(500).send(err);
    })
});

/**
 * Delete a followup with the given ID
 */
router.delete('/:id', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Followup.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.status(500).send(err);
    });
})

module.exports = router;