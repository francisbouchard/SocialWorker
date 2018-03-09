const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Resource = require('../models/Resource');
const Casefile = require('../models/Casefile');

const collections = [ Participant, Resource, Casefile ];

/**
 * Get all records in the trash
 */
router.get('/', (req, res) => {
    let deletedRecords = [];
    let requests = collections.map((collection) => {
        return new Promise((resolve) => {
            collection.find({ deleted: true }).then(records => {
                records.forEach( (record) => {
                    record._doc.model = collection.modelName;
                });
                deletedRecords = deletedRecords.concat(records);
                resolve();
            });
        });
    });
    Promise.all(requests).then( () => {
        res.send(deletedRecords);
    }, err => {
        res.send(err);
    })
});

/**
 * Permanently delete a record by its ID
 */
router.delete('/:model/:id', (req, res) => {
    let collection = collections.find(c => {
        return c.modelName == req.params.model;
    })
    collection.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


module.exports = router;