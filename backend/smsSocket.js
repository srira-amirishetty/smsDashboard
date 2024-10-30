const WebSocket = require('ws');
const SmsMetric = require('./models/SmsMetric');

let wss;

const setupWebSocket = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');

        const sendRealTimeMetrics = async () => {
            const metrics = await SmsMetric.find();
            ws.send(JSON.stringify(metrics));
        };

        const interval = setInterval(sendRealTimeMetrics, 5000); 

        ws.on('close', () => clearInterval(interval));
    });
};

const broadcast = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

module.exports = { setupWebSocket, broadcast };
