const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const userAuth = require("../middlewares/auth.middleware");


const router = express.Router();

//signup endpoint
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

module.exports = router;
