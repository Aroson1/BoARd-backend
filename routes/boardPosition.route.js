const express = require("express");
const authenticate = require("../middlewares/authorization.middleware");
const gameRoom = require("../controllers/boardPosition.controller");


const router = express.Router();

//create board position
router.post("/create-board-position",authenticate, gameRoom.createBoardPosition);
//update board position
router.put("/update-board-position/:position_id", authenticate, gameRoom.updateBoardPosition);
//get board position details
router.get("/position-details/:position_id", authenticate, gameRoom.getBoardPositionDetails);

module.exports = router;
