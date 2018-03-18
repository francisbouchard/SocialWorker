const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const Housing = require('../models/resources/Housing');
const Medical = require('../models/resources/Medical')

/**
 * Get all resources
 */
router.get('/', (req, res) => {
    Resource.find({deleted: { $ne: true }}).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a resource by ID
 */
router.get('/id/:id', (req, res) => {
    Resource.findById(req.params.id).then(data => {
        res.send(data);
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