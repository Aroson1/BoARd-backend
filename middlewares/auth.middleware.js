const { sendResponse } = require("../config/core");
const db = require("../models");
const Player = db.players;

const saveUser = async (req, res, next) => {
  try {
    const username = await Player.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (username) {
      return sendResponse(res, 409, null, "Username already registered");
    }

    const emailcheck = await Player.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailcheck) {
      return sendResponse(res, 409, null, "Email already registered");
    }

    next();
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

module.exports = {
  saveUser,
};
