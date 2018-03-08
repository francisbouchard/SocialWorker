const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Resource = require('../models/Resource');

/**
 * Get all records in the trash
 */
router.get('/', (req, res) => {
    let collections = [ Participant, Resource ];
    let deletedRecords = [];
    let requests = collections.map((collection) => {
        return new Promise((resolve) => {
            collection.find({ deleted: true }).then(records => {
                deletedRecords = deletedRecords.concat(records);
                resolve();
            });
        });
    });
    Promise.all(requests).then( () => {
        res.send(deletedRecords);
    })
});


module.exports = router;