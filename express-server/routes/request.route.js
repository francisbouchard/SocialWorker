const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Resource = require('../models/Resource');

/**
 * Get all requests
 */
router.get('/', (req, res) => {
    Request.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a request by ID
 */
router.get('/:id', (req, res) => {
    Request.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a request by participant ID
 */
router.get('/participant/:id', (req, res) => {
    Request.find({ participant: req.params.id }).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new request
 */
router.post('/', (req, res) => {
    let request = new Request({
        participant: req.body.participant,
        notes: [req.body.notes]
    });
    request.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Add a contacted resource to request
 */
router.post('/:id/resource', (req, res) => {
    Resource.findById(req.body.resourceId).then(resource => {
        if (!resource) return res.send({ err: "Resource ID does not exist." });

        let contResource = {
            _id: req.body.resourceId,
            status: req.body.status
        };
        Request.update({ _id: req.params.id }, { $push: { contactedResources: contResource } }).then(data => {
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
    Request.update({ '_id': req.params.id, 'contactedResources._id': req.params.resId },
        { '$set': { 'contactedResources.$.status': req.body.status } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Delete a request with the given ID
 */
router.delete('/:id', (req, res) => {
    Request.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

module.exports = router;