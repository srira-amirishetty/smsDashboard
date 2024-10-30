import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiService = {

    startSession: async () => {
        return await axios.post(`${API_URL}/session/start`);
    },

    controlSession: async (action) => {
        return await axios.post(
            `${API_URL}/sms/session-control`,
            { action },
            { headers: { Authorization: `${localStorage.getItem('token')}` } }
        );
    },

    getMetrics: async () => {
        const response = await axios.get(`${API_URL}/sms/metrics`, {
            headers: { Authorization: `${localStorage.getItem('token')}` },
        });
        return response.data;
    },


    getCountryOperators: async () => {
        const response = await axios.get(`${API_URL}/country-operators`, {
            headers: { Authorization: `${localStorage.getItem('token')}` },
        });
        return response.data;
    },

    addCountryOperator: async (data) => {
        const response = await axios.post(`${API_URL}/country-operators`, data, {
            headers: { Authorization: `${localStorage.getItem('token')}` },
        });
        return response.data;
    },

    updateCountryOperator: async (id, data) => {
        const response = await axios.put(`${API_URL}/country-operators/${id}`, data, {
            headers: { Authorization: `${localStorage.getItem('token')}` },
        });
        return response.data;
    },

    deleteCountryOperator: async (id) => {
        const response = await axios.delete(`${API_URL}/country-operators/${id}`, {
            headers: { Authorization: `${localStorage.getItem('token')}` },
        });
        return response.data;
    },
};

export default apiService;
