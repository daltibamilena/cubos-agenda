const { getStoredData } = require("../helpers");

exports.execute = () => {
  return {
    status: 200,
    message: getStoredData(),
  };
};
