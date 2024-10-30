const mongoose = require('mongoose');
const CountryOperatorSchema = new mongoose.Schema({
    country:String,
    operator:String,
    highPriority:Boolean,
});

module.exports = mongoose.model('CountryOperator', CountryOperatorSchema);