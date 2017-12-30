const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Document = require('../models/Document');
const Note = require('../models/Note');

/**
 * Get all participants
 */
router.get('/', (req, res) => {
    Participant.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a participant by ID
 */
router.get('/:pid', (req, res) => {
    Participant.findById(req.params.pid).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new participant
 */
router.post('/', (req, res) => {
    let participant = new Participant({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    participant.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Add a document to participant
 */
router.post('/:pid/doc', (req, res) => {
    let document = new Document({
        type: req.body.type,
        date: req.body.date,
        attachment: req.body.attachment
    });
    Participant.findById(req.params.pid).then(participant => {
        if (!participant.documents) {
            participant.documents = [];
        }
        participant.documents.push(document);

        participant.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

/**
 * Add a note to participant
 */
router.post('/:pid/note', (req, res) => {
    let note = new Note({
        text: req.body.text,
        date: req.body.date,
        attachment: req.body.attachment
    });
    Participant.findById(req.params.pid).then(participant => {
        if (!participant.notes) {
            participant.notes = [];
        }
        participant.notes.push(note);

        participant.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

module.exports = router;