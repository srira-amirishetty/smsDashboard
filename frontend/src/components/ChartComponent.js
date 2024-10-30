import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartComponent({ metric }) {
    const chartData = {
        labels: ['SMS Sent', 'Failures', 'Success Rate'],
        datasets: [
            {
                label: `${metric.country} - ${metric.operator}`,
                data: [metric.smsSent, metric.failures, metric.successRate],
                backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0'],
            },
        ],
    };

    return (
        <div className="chart">
            <Bar data={chartData} />
        </div>
    );
}

export default ChartComponent;
