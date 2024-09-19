// lib/adapter/apiAdapter.js
const axios = require('axios');

async function getAuthToken(apiUrl, apiKey) {
  try {
    const response = await axios.post(apiUrl, { apiKey });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch auth token");
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
        throw new Error(error);
    }
}

module.exports = {
    getAuthToken,
    fetchData,
};
