const SmsMetric = require('../models/SmsMetric');
const smsMetricSeeder = require('../seeders/smsMetricsSeeder');
const sendTelegramAlert = require('../telegramAlert.js');


const CRITICAL_SUCCESS_RATE_THRESHOLD = 50; 


const monitorMetrics = async (metrics) => {
    for (const metric of metrics) {
        if (metric.successRate < CRITICAL_SUCCESS_RATE_THRESHOLD) {
            const alertMessage = `⚠️ Critical Alert: Low Success Rate\n
            Country: ${metric.country}\n
            Operator: ${metric.operator}\n
            Success Rate: ${metric.successRate}%`;

            await sendTelegramAlert(alertMessage);
        }
    }
};

exports.getMetrics = async (req, res) => {
    try {
        const metrics = await SmsMetric.find();
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch SMS metrics' });
    }
};

exports.controlSession = async (req, res) => {
    const { action } = req.body;
    
    try {
        if (action === 'start') {
            smsMetricSeeder.startSeeding();
            res.json({ message: 'Session started' });
        } else if (action === 'stop') {
            smsMetricSeeder.stopSeeding(); 
            res.json({ message: 'Session stopped' });
        } else if (action === 'restart') {
            smsMetricSeeder.stopSeeding();
            setTimeout(() => smsMetricSeeder.startSeeding(), 1000);
            res.json({ message: 'Session restarted' });
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to control session' });
    }
};
