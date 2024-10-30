import React, { useEffect, useState } from 'react';
import websocketService from '../services/websocketService';
import { Bar } from 'react-chartjs-2';

const RealTimeChart = () => {
    const [smsMetrics, setSmsMetrics] = useState([]);

    useEffect(() => {
        websocketService.connect('ws://localhost:5000');
        websocketService.onMessage((data) => setSmsMetrics(data));

        return () => websocketService.disconnect();
    }, []);

    const chartData = {
        labels: smsMetrics.map((metric) => `${metric.country} - ${metric.operator}`),
        datasets: [
            {
                label: 'SMS Sent',
                data: smsMetrics.map((metric) => metric.smsSent),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Failures',
                data: smsMetrics.map((metric) => metric.failures),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Success Rate (%)',
                data: smsMetrics.map((metric) => metric.successRate),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default RealTimeChart;
