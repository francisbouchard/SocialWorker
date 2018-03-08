const express = require('express');
const router = express.Router();
const Phonelog = require('../models/Phonelog');
const ObjectId = require('mongoose').Types.ObjectId;


/**
 * Get all Phonelog
 */
router.get('/', (req, res) => {
    Phonelog.find().
    populate('user')
    .populate('resolvedBy').then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


router.get('/active', (req, res) => {
    Phonelog.find({ "resolved": { "$in": ["false",false]},"deleted": { "$in": ["false",false]}})
    .populate('user')
    .populate('resolvedBy')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
    })
});

router.get('/resolved', (req, res) => {
    Phonelog.find({ "resolved": { "$in": ["true",true]},"deleted": { "$in": ["false",false]}})
    .populate('user')
    .populate('resolvedBy')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
    })
});

router.get('/deleted', (req, res) => {
    Phonelog.find({ "deleted": { "$in": ["false",false] } })
    .populate('user')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
    })
});

/**
 * Create a new Phonelog
 */
router.post('/', (req, res) => {
    let phonelog = new Phonelog({
        name: req.body.name,
        pronouns: req.body.pronouns,
        user: req.user._id,
        urgent: req.body.urgent,
        phonenumber: req.body.phonenumber,
        subject: req.body.subject,
        notes: [req.body.notes],
        callertype: req.body.callertype,
    });
    phonelog.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

router.put('/:lid', (req, res) => {
    Phonelog.findById(req.params.lid).then(log => {
        log.name = req.body.name || log.name;
        log.pronouns = req.body.pronouns || log.pronouns;
        log.phonenumber = req.body.phonenumber || log.phonenumber;
        log.subject = req.body.subject || log.subject;
        log.notes= [req.body.notes] || log.notes;
        log.urgent = req.body.urgent ;
        log.callertype = req.body.callertype || log.callertype;
        log.message = req.body.message || log.message;
        log.date=req.body.date||log.date
        log.language=req.body.language||log.language;



        log.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});
    
router.put('/:id/deleted', (req, res) => {
    Phonelog.update({ '_id': req.params.id }, { '$set': { deleted: req.body.deleted}})
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

router.put('/:id/resolved', (req, res) => {
    Phonelog.update({ '_id': req.params.id }, { '$set': { resolved: req.body.resolved,resolvedBy: req.user._id ,dateResolved:Date.now() } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});
module.exports = router;