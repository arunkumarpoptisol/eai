const { transformData } = require("eai-nodejs");

module.exports.getShopifyExpression = async (data) => {
  const jsonataExpression = `{
      "_id":_id,
       "newPhase": phase,
       "newData": data,
       "timestamp": timestamp
       }`;

  const transformedData = await transformData(data, jsonataExpression);
  const expression = {
    //other metadata
    data: {
      ...transformedData,
    },
  };
  return expression;
};
