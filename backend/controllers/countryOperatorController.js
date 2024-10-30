const CountryOperator = require('../models/CountryOperator');

exports.getAllCountryOperators = async (req, res) => {
    try {
        const operators = await CountryOperator.find();
        res.json(operators);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country-operator pairs' });
    }
};

exports.addCountryOperator = async (req, res) => {
    try {
        const newOperator = new CountryOperator(req.body);
        await newOperator.save();
        res.json(newOperator);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add country-operator pair' });
    }
};

exports.updateCountryOperator = async (req, res) => {
    try {
        const updatedOperator = await CountryOperator.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOperator);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update country-operator pair' });
    }
};

exports.deleteCountryOperator = async (req, res) => {
    try {
        await CountryOperator.findByIdAndDelete(req.params.id);
        res.json({ message: 'Country-operator pair deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete country-operator pair' });
    }
};
