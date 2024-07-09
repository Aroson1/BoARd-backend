const express = require("express");
const authenticate = require("../middlewares/authorization.middleware");
const gameRoom = require("../controllers/gameRoom.controller");


const router = express.Router();

//create game room
router.post("/create-game-room",authenticate, gameRoom.createGameRoom);
//update game room
router.put("/update-game-room/:room_id", authenticate, gameRoom.updateGameRoom);
//delete game room
router.delete("/delete-game-room/:room_id", authenticate, gameRoom.deleteGameRoom);
//join game room
router.post("/join-game-room", authenticate, gameRoom.joinGameRoom);
//leave game room
router.post("/leave-game-room", authenticate, gameRoom.leaveGameRoom);
//register in game room
router.post("/register-in-game-room", authenticate, gameRoom.registerInGameRoom);
//get game room details
router.get("/room-details/:room_id", authenticate, gameRoom.getGameRoomDetails);

module.exports = router;
