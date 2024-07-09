const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const Player = db.players;

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };
    const user = await Player.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      return res.status(201).send({ user, token });
    } else {
      return sendResponse(res, 400, null, "Failed to create user");
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Player.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);


      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(201).send({user, token});
      } else {
        return sendResponse(res, 401, null, "Authentication failed");
      }
    } else {
      return sendResponse(res, 404, null, "User not found");
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

module.exports = {
  signup,
  login,
};
