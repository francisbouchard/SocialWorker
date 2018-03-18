const express = require('express');
const router = express.Router();
const Resource = require('../../models/Resource');
const Medical = require('../../models/resources/Medical');


/**
 * Get all medical resources
 */
router.get('/medical', (req, res) => {
    Resource.find({deleted: { $ne: true }}).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


/**
 * Create a new medical resource
 */
router.post('/', (req, res) => {
    let medical = new Medical({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        notes: req.body.notes,
        without_cost: req.body.without_cost,
        waitlist_time: req.body.waitlist_time,
        schedule_availability: req.body.schedule_availability
    });
    medical.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Update given medical resource
 */
router.put('/:id', (req, res) => {
    Resource.findById(req.params.id).then(medical => {
        medical.name = req.body.name || medical.name;
        medical.email = req.body.email || medical.email;
        medical.phone = req.body.phone || medical.phone;
        medical.location = req.body.location || medical.location;
        medical.notes = req.body.notes || medical.notes;
        medical.without_cost = req.body.without_cost || medical.without_cost;
        medical.waitlist_time = req.body.waitlist_time || medical.waitlist_time;
        medical.schedule_availability = req.body.schedule_availability || medical.schedule_availability;

        medical.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

module.exports = router;