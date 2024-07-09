const jwt = require("jsonwebtoken");
const { log, sendResponse } = require("../config/core");

const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  try {
    token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user_id = decoded.id;
    log(req.body.user_id, "info", "green");
    next();
  } catch (err) {
    return sendResponse(res, 401, null, "Invalid token");
  }
};

module.exports = authenticate;
