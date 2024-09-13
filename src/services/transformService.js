const jsonata = require('jsonata');

exports.transformData = (data, jsonataExpression) => {
    try {
        const expression = jsonata(jsonataExpression);        
        const transformedData = expression.evaluate(data);
        return transformedData;
    } catch (error) {
        console.error('Error transforming data:', error);
        throw error;
    }
};
