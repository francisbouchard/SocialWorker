const express = require('express');
const router = express.Router();
const Casefile = require('../models/Casefile');
const Resource = require('../models/Resource');

/**
 * Get all Cases
 */
router.get('/', (req, res) => {
    Casefile.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Casefile by ID
 */
router.get('/:id', (req, res) => {
    Casefile.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Casefile by participant ID
 */
router.get('/participant/:id', (req, res) => {
    Casefile.find({ participant: req.params.id }).populate('contactedResources.resource').then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a contacted resource of a Casefile by resource ID
 */
router.get('/:id/resource/:resId', (req, res) => {
    Casefile.findOne({ _id: req.params.id, 'contactedResources._id': req.params.resId },
        { 'contactedResources.$': 1 }).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new Casefile
 */
router.post('/', (req, res) => {
    let casefile = new Casefile({
        participant: req.body.participant,
        notes: [req.body.notes],
        status: req.body.status,
        urgency: req.body.urgency,
        contactedResources: req.body.contactedResources
    });
    casefile.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Add a contacted resource to Casefile
 */
router.post('/:id/resource', (req, res) => {
    Resource.findById(req.body.resourceId).then(resource => {
        if (!resource) return res.send({ err: "Resource ID does not exist." });

        let contResource = {
            _id: req.body.resourceId,
            status: req.body.status
        };
        Casefile.update({ _id: req.params.id }, { $push: { contactedResources: contResource } }).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    });
});

/**
 * Update status of a contacted resource
 */
router.put('/:id/resource/:resId', (req, res) => {
    Casefile.update({ '_id': req.params.id, 'contactedResources._id': req.params.resId },
        { '$set': { 'contactedResources.$.status': req.body.status } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Update status of a Casefile
 */
router.put('/:id/status', (req, res) => {
    Casefile.update({ '_id': req.params.id }, { '$set': { status: req.body.status } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Delete a Casefile with the given ID
 */
router.delete('/:id', (req, res) => {
    Casefile.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

module.exports = router;