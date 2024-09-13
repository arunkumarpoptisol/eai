const axios = require('axios');
const config = require('../config/config');

exports.getAuthToken = async () => {
    try {
        const response = await axios.post(config.api.tokenUrl, {
            client_id: config.api.clientId,
            client_secret: config.api.clientSecret,
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching auth token:', error);
        throw error;
    }
};

exports.fetchData = async (token) => {
    try {
        const response = await axios.get(config.api.url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
};
