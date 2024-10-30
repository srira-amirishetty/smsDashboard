const client = require('prom-client');


const smsSentCounter = new client.Counter({
    name: 'sms_sent_total',
    help: 'Total number of SMS messages sent',
    labelNames: ['country', 'operator']
});

const smsFailureCounter = new client.Counter({
    name: 'sms_failure_total',
    help: 'Total number of SMS failures',
    labelNames: ['country', 'operator']
});

const smsSuccessRateGauge = new client.Gauge({
    name: 'sms_success_rate',
    help: 'Current success rate of SMS messages',
    labelNames: ['country', 'operator']
});

const updateMetrics = (country, operator, smsSent, failures, successRate) => {
    smsSentCounter.labels(country, operator).inc(smsSent);
    smsFailureCounter.labels(country, operator).inc(failures);
    smsSuccessRateGauge.labels(country, operator).set(successRate);
};

module.exports = {
    updateMetrics,
    metricsRoute: (req, res) => {
        res.set('Content-Type', client.register.contentType);
        res.end(client.register.metrics());
    }
};
