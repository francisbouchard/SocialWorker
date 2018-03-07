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
    Casefile.find({ participant: req.params.id })
    .populate('contactedResources.resource')
    .populate('selectedResource.resource')
    .then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a contacted resource of a Casefile by resource ID
 */
router.get('/:id/resource/:resId', (req, res) => {
    Casefile.findOne({ _id: req.params.id, 'contactedResources.resource': req.params.resId },
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
        type: req.body.type,
        urgency: req.body.urgency,
        contactedResources: req.body.contactedResources,
        selectedResource: req.body.selectedResource,
        date: req.body.date
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
            resource: req.body.resourceId,
            isContacted: req.body.isContacted,
            dateContacted: req.body.dateContacted,
            note: req.body.note
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
 * Update a contacted resource's details
 */
router.put('/:id/resource/:resId', (req, res) => {
    let statusStr = 'contactedResources.$.isContacted';
    let dateStr = 'contactedResources.$.dateContacted';
    let noteStr = 'contactedResources.$.note';
    let setObj = {};
    if (req.body.hasOwnProperty('isContacted') || req.body.hasOwnProperty('dateContacted')) {
        setObj['contactedResources.$.isContacted'] = req.body.isContacted;
        setObj['contactedResources.$.dateContacted'] = req.body.dateContacted;
    } if (req.body.hasOwnProperty('note')) {
        setObj['contactedResources.$.note'] = req.body.note;
    }

    Casefile.update({ _id: req.params.id, 'contactedResources.resource': req.params.resId }, { '$set': setObj })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        });
});

/**
 * Update a casefile with a selected resource
 * selectedResource contains: resource, startDate, endDate
 *
 */
router.put('/:id/selection', (req, res) => {
    Casefile.update({ '_id': req.params.id }, { '$set': { selectedResource: req.body.selectedResource}})
    .then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    });
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
 * Update note of a Casefile
 */
router.put('/:id/note', (req, res) => {
    Casefile.update({ '_id': req.params.id }, { '$set': { notes: [req.body.notes] }})
    .then(data => {
        res.send(data);
    }), err => {
        res.send(err);
    }
})

/**
 * Delete a Casefile with the given ID
 * 
 * If the user making this request is an administrator, the casefile will be permanently deleted. 
 * Otherwise, it will only be flagged as deleted.
 */
router.delete('/:id', (req, res) => {
    if (req.user.role === "admin") {
        Casefile.findByIdAndRemove(req.params.id).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else {
        Casefile.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true }).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }
})

module.exports = router;