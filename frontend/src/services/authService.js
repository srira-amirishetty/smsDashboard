import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
    login: async (username, password) => { 
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            throw error; 
        }
    },

    register: async (username, password) => {
        const response = await axios.post(`${API_URL}/auth/register`, { username, password });
        return response.data; 
    },

    verifyToken: async (token) => {
        try {
            await axios.get(`${API_URL}/auth/verify-token`, {
                headers: { Authorization: `${token}` },
            });
            return true;
        } catch (error) {
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },
};

export default authService;
