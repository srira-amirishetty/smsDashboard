const mongoose = require('mongoose');
const SmsMetricsSchema = new mongoose.Schema({
    country:String,
    operator:String,
    smsSent:Number,
    successRate:Number,
    failures:Number,
});

module.exports = mongoose.model('SmsMetric', SmsMetricsSchema);