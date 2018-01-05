const express = require('express');
const router = express.Router();
const passportConfig = require("../config/passport")

/* GET api listing. */
router.get('/', passportConfig.isAuthenticated, (req, res) => {
	    res.send('api works');
});

module.exports = router;
