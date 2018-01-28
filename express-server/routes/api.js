const express = require('express');
const router = express.Router();
const passportConfig = require("../config/passport")

/* GET api listing. */
router.get('/',  (req, res) => {
	    res.send('api works');
});

module.exports = router;
