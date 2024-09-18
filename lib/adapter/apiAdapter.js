// lib/adapter/apiAdapter.js
const axios = require('axios');

async function getAuthToken(apiKey) {
    try {
        const response = await axios.post('https://example.com/api/auth', { apiKey });
        return response.data.token;
    } catch (error) {
        throw new Error('Failed to fetch auth token');
    }
}

async function fetchData(apiUrl, token) {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

module.exports = {
    getAuthToken,
    fetchData,
};
