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
 * Delete all records in trash bin
 */
router.delete('/all', (req, res) => {
    let results = [];
    let requests = collections.map((collection) => {
        return new Promise((resolve) => {
            collection.remove({ deleted: true }).then(data => {
                data.model = collection.modelName;
                results = results.concat(data);
                resolve();
            });
        });
    });
    Promise.all(requests).then( () => {
        res.send(results);
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
    });
    collection.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Restore a record from the trash by its ID
 */
router.put('/:model/:id', (req, res) => {
    let collection = collections.find(c => {
        return c.modelName == req.params.model;
    });
    collection.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true }).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


module.exports = router;