const express = require('express');
const router = express.Router();
const Phonelog = require('../models/Phonelog');
const ObjectId = require('mongoose').Types.ObjectId;


/**
 * Get all Phonelog
 */
router.get('/', (req, res) => {
    Phonelog.find().then(data => {
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
        log.user= req.body.user || log.user;
        log.subject = req.body.subject || log.subject;
        log.notes= [req.body.notes] || log.notes;
        log.urgent = req.body.documents || log.urgent;
        log.callertype = req.body.callertype || log.callertype;


        log.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

module.exports = router;