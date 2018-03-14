const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const Medical = require('../models/resources/Medical');


/**
 * Get all medical resources
 */
router.get('/medical', (req, res) => {
    Resource.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


/**
 * Create a new medical resource
 */
router.post('/medical', (req, res) => {
    let medical = new Medical({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        notes: req.body.notes,
        term: req.body.term,
        gender: req.body.gender,
        constraints: req.body.constraints
    });
    medical.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Update given medical resource
 */
router.put('/medical/:id', (req, res) => {
    Resource.findById(req.params.id).then(medical => {
        medical.name = req.body.name || medical.name;
        medical.email = req.body.email || medical.email;
        medical.phone = req.body.phone || medical.phone;
        medical.location = req.body.location || medical.location;
        medical.notes = req.body.notes || medical.notes;
        medical.term = req.body.term || medical.term;
        medical.gender = req.body.gender || medical.gender;
        medical.constraints = req.body.constraints || medical.constraints;

        medical.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

module.exports = router;