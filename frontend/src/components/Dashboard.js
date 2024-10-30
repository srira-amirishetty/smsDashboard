import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import apiService from '../services/apiService';

function Dashboard() {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            const data = await apiService.getMetrics();
            setMetrics(data);
        };

        fetchMetrics();
    }, []);

    return (
        <div className="dashboard">
            {metrics.map((metric, index) => (
                <ChartComponent key={index} metric={metric} />
            ))}

        </div>
    );
}

export default Dashboard;
