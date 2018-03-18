const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

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
 * Resource will only be flagged as deleted.
 */
router.delete('/:id', (req, res) => {
    Resource.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true }).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

module.exports = router;