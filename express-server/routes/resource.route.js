const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const Housing = require('../models/resources/Housing');
const Medical = require('../models/resources/Medical')

/**
 * Get all resources
 */
router.get('/', (req, res) => {
    Resource.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get all housing resources
 */
router.get('/housing', (req, res) => {
    Resource.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a resource by ID
 */
router.get('/:id', (req, res) => {
    Resource.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new housing resource
 */
router.post('/housing', (req, res) => {
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
router.put('/housing/:id', (req, res) => {
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



/**
 * Delete a resource with the given ID
 * 
 * If the user making this request is an administrator, the resource will be permanently deleted.
 * Otherwise, it will only be flagged as deleted.
 */
router.delete('/:id', (req, res) => {
    if (req.user.role === "admin") {
        Resource.findByIdAndRemove(req.params.id).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else {
        Resource.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true }).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }
})

module.exports = router;