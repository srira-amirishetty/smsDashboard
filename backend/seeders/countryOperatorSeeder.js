const mongoose = require('mongoose');
const CountryOperator = require('../models/CountryOperator');


const countryOperatorData = [
    { country: 'Uzbekistan', operator: 'UzMobile', highPriority: true },
    { country: 'Ukraine', operator: '3Mob', highPriority: false },
    { country: 'Tajikistan', operator: 'MegaFon - TT Mobile', highPriority: true },
    { country: 'India', operator: 'Reliance - West Bengal', highPriority: false },
    { country: 'India', operator: 'TATA DOCOMO - Maharashtra & Goa', highPriority: false },
    { country: 'India', operator: 'Vi India - Maharashtra & Goa', highPriority: true },
    { country: 'India', operator: 'AirTel - Gujarat', highPriority: false },
];

const seedCountryOperators = async () => {
    try {
        await CountryOperator.deleteMany();
        await CountryOperator.insertMany(countryOperatorData);
        console.log('Country-Operator Data Seeded!');
    } catch (error) {
        console.error(`Error seeding Country-Operator data: ${error}`);
    }
};

module.exports = seedCountryOperators;
