const jwt = require("jsonwebtoken");
const { log, sendResponse } = require("../config/core");

const generateQR = async (req, res, next) => {
  //TODO: Implement QR code generation
  next();
};

module.exports = {
  generateQR,
};
