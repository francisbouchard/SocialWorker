const express = require('express');
const router = express.Router();
const Resource = require('../../models/Resource');
const Housing = require('../../models/resources/Housing');

/**
 * Get all housing resources
 */
router.get('/', (req, res) => {
    Resource.find({deleted: { $ne: true }}).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


/**
 * Create a new housing resource
 */
router.post('/', (req, res) => {
    let housing = new Housing({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        notes: req.body.notes,
        term: req.body.term,
        gender: req.body.gender,
        constraints: req.body.constraints
    });
    housing.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Update given housing resource
 */
router.put('/:id', (req, res) => {
    Resource.findById(req.params.id).then(housing => {
        housing.name = req.body.name || housing.name;
        housing.email = req.body.email || housing.email;
        housing.phone = req.body.phone || housing.phone;
        housing.location = req.body.location || housing.location;
        housing.notes = req.body.notes || housing.notes;
        housing.term = req.body.term || housing.term;
        housing.gender = req.body.gender || housing.gender;
        housing.constraints = req.body.constraints || housing.constraints;

        housing.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

module.exports = router;