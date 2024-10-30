const mongoose = require('mongoose');
const seedCountryOperators = require('./countryOperatorSeeder');
const env = require('dotenv');
env.config();


const seedAll = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        await seedCountryOperators();

        console.log('Database Seeding Completed');
        mongoose.disconnect();
    } catch (error) {
        console.error(`Database Seeding Failed: ${error}`);
        mongoose.disconnect();
    }
};

seedAll();
