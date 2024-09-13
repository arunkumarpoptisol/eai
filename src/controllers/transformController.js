const Log = require('../models/Log');
const { transformData } = require('../services/transformService');

exports.processTransform = async (data, jsonataExpression) => {
    try {
        const transformedData = transformData(data, jsonataExpression);

        await Log.create({
            phase: 'transform',
            data: transformedData,
        });
 
        return transformedData;
    } catch (error) {
        console.error('Transform processing error:', error);
        throw error;
    }
};
