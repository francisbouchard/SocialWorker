const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Resource = require('../models/Resource');
const Casefile = require('../models/Casefile');
const User = require('../models/User');
const Phonelog = require('../models/Phonelog');
const NULL_PARTICIPANT = require('../config/null-objects').NULL_PARTICIPANT;
const NULL_RESOURCE = require('../config/null-objects').NULL_RESOURCE;
const NULL_USER = require('../config/null-objects').NULL_USER;

const collections = [Participant, Resource, Casefile, User, Phonelog];

/**
 * Get all records in the trash
 */
router.get('/', (req, res) => {
    let deletedRecords = [];
    let requests = collections.map((collection) => {
        return new Promise((resolve) => {
            collection.find({ deleted: true, _id: {$nin: [NULL_PARTICIPANT, NULL_RESOURCE, NULL_USER]} })
            .then(records => {
                records.forEach((record) => {
                    record._doc.model = collection.modelName;
                });
                deletedRecords = deletedRecords.concat(records);
                resolve();
            });
        });
    });
    // notes and documents are treated differently since no separate collection
    let notesReq = new Promise((resolve) => {
        Participant.aggregate([
            { $match: { 'notes.deleted': true } },
            { $unwind: '$notes' },
            { $match: { 'notes.deleted': true } }]).then(notes => {
                notes.forEach((record) => {
                    record.model = "Note";
                    record.participant = record._id;
                    record._id = record.notes._id;
                });
                deletedRecords = deletedRecords.concat(notes);
                resolve();
            });
    });
    let docsReq = new Promise((resolve) => {
        Participant.aggregate([
            { $match: { 'documents.deleted': true } },
            { $unwind: '$documents' },
            { $match: { 'documents.deleted': true } }]).then(documents => {
                documents.forEach((record) => {
                    record.model = "Document";
                    record.participant = record._id;
                    record._id = record.documents._id;
                });
                deletedRecords = deletedRecords.concat(documents);
                resolve();
            });
    });
    requests.push(notesReq);
    requests.push(docsReq);
    
    Promise.all(requests).then(() => {
        res.send(deletedRecords);
    }, err => {
        res.send(err);
    })
});

/**
 * Permanently delete a record by its ID
 */
router.delete('/:model/:id', (req, res) => {
    if (req.params.model == "Note") {
        Participant.update({},
            { $pull: { notes: { _id: req.params.id } } },
            { multi: true }
        ).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else if (req.params.model == "Document") {
        Participant.update({},
            { $pull: { documents: { _id: req.params.id } } },
            { multi: true }
        ).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else {
        let collection = collections.find(c => {
            return c.modelName == req.params.model;
        });
        collection.findById(req.params.id).then(doc => {
            doc.remove().then(data => {
                res.send(data);
            }, err => {
                res.send(err);
            });
        }, err => {
            res.send(err);
        })
    }
});

/**
 * Restore a record from the trash by its ID
 */
router.put('/:model/:id', (req, res) => {
    if (req.params.model == "Note") {
        Participant.updateOne({ notes: { $elemMatch: { _id: req.params.id } } },
            { $set: { 'notes.$.deleted': false } }
        ).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else if (req.params.model == "Document") {
        Participant.updateOne({ documents: { $elemMatch: { _id: req.params.id } } },
            { $set: { 'documents.$.deleted': false } }
        ).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else {
        let collection = collections.find(c => {
            return c.modelName == req.params.model;
        });
        collection.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true }).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }
});


module.exports = router;