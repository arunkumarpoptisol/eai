// lib/queue/processMessage.js
const { getAuthToken, fetchData } = require('../adapter/apiAdapter');
const { transformData } = require('../transformer/dataTransformer');

async function processMessage(message) {
    const { apiKey, apiUrl, transformationExpression } = message;

    try {
        // Step 1: Get token and fetch data
        const token = await getAuthToken(apiKey);
        const data = await fetchData(apiUrl, token);

        // Step 2: Transform data using JSONata expression
        const transformedData = await transformData(data, transformationExpression);

        console.log('Processed Data:', transformedData);

        // Further processing logic can be added here
    } catch (error) {
        console.error("Message processing failed:", error);
        throw new Error(error);
    }
}

module.exports = processMessage;
