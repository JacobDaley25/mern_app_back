const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions-controller.js');

router.post('/', sessionsController.handleLogin);

module.exports = router;
