const Log = require('../models/Log');
const { getAuthToken, fetchData } = require('../services/adapterService');

exports.processAdapter = async (data) => {
    try {
        const token = await getAuthToken();
        const apiData = await fetchData(token);

        await Log.create({
            phase: 'adapter',
            data: apiData,
        });

        return apiData;
    } catch (error) {
        console.error('Adapter processing error:', error);
        throw error;
    }
};
