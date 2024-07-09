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
      return res.status(409).json({ message: "Username already taken" });
    }

    const emailcheck = await Player.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailcheck) {
      return res.status(409).json({ message: "Email already registered" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  saveUser,
};
