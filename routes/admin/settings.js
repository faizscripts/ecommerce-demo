const settingsTemplate = require('../../views/admin/settings');
const {Special, validate} = require('../../models/admin/special');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    res.send(settingsTemplate());
});

module.exports = router;