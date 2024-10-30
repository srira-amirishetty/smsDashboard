const SmsMetric = require('../models/SmsMetric');
const CountryOperator = require('../models/CountryOperator');

let seederInterval;

const generateRandomMetrics = () => ({
    smsSent: Math.floor(Math.random() * 500),
    successRate: Math.floor(Math.random() * 100),
    failures: Math.floor(Math.random() * 100)
});



const seedSmsMetrics = async () => {
    try {
        const countryOperators = await CountryOperator.find();

        for (const pair of countryOperators) {
            const metrics = generateRandomMetrics();
            
            await SmsMetric.findOneAndUpdate(
                { country: pair.country, operator: pair.operator },
                { $set: { ...metrics, updatedAt: Date.now() } },
                { upsert: true, new: true }
            );

            console.log(`Updated metrics for ${pair.country} - ${pair.operator}`);
        }
    } catch (error) {
        console.error('Error seeding SMS metrics', error);
    }
};

exports.startSeeding = () => {
    if (!seederInterval) {
        seederInterval = setInterval(seedSmsMetrics, 5000);
        console.log('Seeding started');
    }
};

exports.stopSeeding = () => {
    if (seederInterval) {
        clearInterval(seederInterval);
        seederInterval = null;
        console.log('Seeding stopped');
    }
};
