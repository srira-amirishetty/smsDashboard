const express = require('express');
const { 
    addCountryOperator, 
    updateCountryOperator, 
    deleteCountryOperator, 
    getAllCountryOperators 
} = require('../controllers/countryOperatorController');
const router = express.Router();

// @route    GET /api/country-operators
// @desc     Get all country-operator pairs
// @access   Private
router.get('/', getAllCountryOperators);

// @route    POST /api/country-operators
// @desc     Add a new country-operator pair
// @access   Private
router.post('/', addCountryOperator);

// @route    PUT /api/country-operators/:id
// @desc     Update a country-operator pair
// @access   Private
router.put('/:id', updateCountryOperator);

// @route    DELETE /api/country-operators/:id
// @desc     Delete a country-operator pair
// @access   Private
router.delete('/:id', deleteCountryOperator);

module.exports = router;
