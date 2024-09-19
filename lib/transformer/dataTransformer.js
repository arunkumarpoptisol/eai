// lib/transformer/dataTransformer.js
const jsonata = require('jsonata');

async function transformData(data, expression) {
    try {
        const transformed = jsonata(expression).evaluate(data);
        return transformed;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    transformData,
};