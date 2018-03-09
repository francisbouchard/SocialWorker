const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Resource = require('../models/Resource');
const Casefile = require('../models/Casefile');

/**
 * Get all records in the trash
 */
router.get('/', (req, res) => {
    let collections = [ Participant, Resource, Casefile ];
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


module.exports = router;