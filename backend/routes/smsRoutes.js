const express = require('express');
const { getMetrics, controlSession } = require('../controllers/smsController');
const router = express.Router();

// @route    GET /api/sms/metrics
// @desc     Get real-time SMS metrics
// @access   Private
router.get('/metrics', getMetrics);

// @route    POST /api/sms/session-control
// @desc     Control SMS session (start/stop/restart)
// @access   Private
router.post('/session-control', controlSession);

module.exports = router;
