const express = require('express');
const router = express.Router();
const Phonelog = require('../models/Phonelog');

/**
 * Get all Phonelog
 */
router.get('/', (req, res) => {
    Phonelog.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new Phonelog
 */
router.post('/', (req, res) => {
    let phonelog = new Phonelog({
        name: req.body.name,
        pronoun: req.body.pronoun,
        user: req.body.user,
        urgent: req.body.urgent,
        phonenumber: req.body.phonenumber,
        notes: [req.body.notes],
    });
    phonelog.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

module.exports = router;