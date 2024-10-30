const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const smsRoutes = require('./routes/smsRoutes');
const countryOperatorRoutes = require('./routes/countryOperatorRoutes');
const {authenticateJWT} = require('./middleware/authMiddleware');
const {metricsRoute} = require('./promethusMetrics');
const { setupWebSocket } = require('./smsSocket');
const http = require('http');
const sessionRoutes = require('./routes/sessionRoutes'); 

env.config();
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
setupWebSocket(server);

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.get('/metrics', metricsRoute);

app.get('/' , (req, res)=>{
    res.send('WebSocket server is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/sms', authenticateJWT, smsRoutes);
app.use('/api/country-operators', authenticateJWT, countryOperatorRoutes);
app.use('/api/session', sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))