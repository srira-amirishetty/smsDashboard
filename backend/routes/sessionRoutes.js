const express = require('express');
const router = express.Router();
const SmsMetric = require('../models/SmsMetric'); 
const WebSocket = require('ws'); 

// @route   POST /api/session/start
// @desc    Start a session and update smsmetric data
// @access  Public
router.post('/start', async (req, res) => {
    try {

        const metrics = await SmsMetric.find(); 

        metrics.forEach(async (metric) => {
            metric.smsSent += Math.floor(Math.random() * 50) + 1;
            metric.failures += Math.floor(Math.random() * 10);
            metric.successRate = Math.floor(((metric.smsSent - metric.failures) / metric.smsSent) * 100);
            await metric.save();
        });


        req.app.get('wss').clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(metrics)); 
            }
        });

        res.status(200).json({ message: 'Session started, metrics updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error starting session' });
    }
});

module.exports = router;
