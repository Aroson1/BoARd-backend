const bcrypt = require("bcrypt");
const db = require("../models");
const { log, sendResponse } = require("../config/core");

const createGameRoom = async (req, res) => {
  try {
    const { room_name, max_players, room_host, room_description, user_id } =
      req.body;

    const data = {
      room_name,
      room_description: room_description || null,
      max_players,
      room_host,
      game_status: "offline",
      registered_player_ids: [user_id],
    };

    const gameRoom = await db.gamerooms.create(data);

    if (gameRoom) {
      return sendResponse(res, 201, gameRoom, "Game room created successfully");
    }

    return sendResponse(res, 400, null, "Failed to create game room");
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

const updateGameRoom = async (req, res) => {
  try {
    const { room_id } = req.params;
    const { room_name, room_description } = req.body;
    const gameRoom = await db.gamerooms.findOne({ where: { id: room_id } });

    if (gameRoom) {
      gameRoom.room_name = room_name || gameRoom.room_name;
      gameRoom.room_description = room_description || gameRoom.room_description;
      await gameRoom.save();
      return sendResponse(res, 200, gameRoom, "Game room updated successfully");
    }
    else
      return sendResponse(res, 404, null, "Game room not found");
  }
  catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

const getGameRoomDetails = async (req, res) => {
  try {
    const { room_id } = req.params;
    const gameRoom = await db.gamerooms.findOne({ where: { id: room_id } });

    if (gameRoom) {
      return sendResponse(res, 200, gameRoom, "Game room details fetched successfully");
    }
    
    return sendResponse(res, 404, null, "Game room not found");
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

const deleteGameRoom = async (req, res) => {
  try {
    const { room_id } = req.params;
    const gameRoom = await db.gamerooms.findOne({ where: { id: room_id } });

    if (gameRoom) {
      await gameRoom.destroy();
      return sendResponse(res, 200, null, "Game room deleted successfully");
    }

    return sendResponse(res, 404, null, "Game room not found");
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

const joinGameRoom = async (req, res) => {
  try {
    const { room_id, user_id } = req.body;
    const gameRoom = await db.gamerooms.findOne({ where: { id: room_id } });
    if (gameRoom) {
      const activePlayerIds = gameRoom.active_player_ids;
      if (activePlayerIds.length == gameRoom.max_players)
        return sendResponse(res, 400, null, "Game room is full");
      if (activePlayerIds.indexOf(user_id) !== -1)
        return sendResponse(res, 400, null, "You have already joined the game room");

      const registeredPlayerIds = gameRoom.registered_player_ids;

      if (registeredPlayerIds.indexOf(user_id) !== -1) {
        activePlayerIds.push(user_id);
        gameRoom.active_player_ids = activePlayerIds;
        await gameRoom.save();
        return sendResponse(res, 200, gameRoom, "You have successfully joined the game room");
      } else {
        return sendResponse(res, 400, null, "You are not registered in the game room");
      }
    } else {
      return sendResponse(res, 404, null, "Game room not found");
    }
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

const leaveGameRoom = async (req, res) => {
  try {
    const { room_id, user_id } = req.body;
    const gameRoom = await db.gamerooms.findOne({ where: { id: room_id } });

    if (gameRoom) {
      const activePlayerIds = gameRoom.active_player_ids;
      const index = activePlayerIds.indexOf(user_id);
      if (index > -1) {
        activePlayerIds.splice(index, 1);
      }
      gameRoom.active_player_ids = activePlayerIds;
      await gameRoom.save();
      return sendResponse(res, 200, null, "You have successfully left the game room");
    } else {
      return sendResponse(res, 404, null, "Game room not found");
    }
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

const registerInGameRoom = async (req, res) => {
  try {
    const { room_id, user_id } = req.body;
    const gameRoom = await db.gamerooms.findOne({ where: { id: room_id } });

    if (gameRoom) {
      const registeredPlayerIds = gameRoom.registered_player_ids;
      registeredPlayerIds.push(user_id);
      gameRoom.registered_player_ids = registeredPlayerIds;
      await gameRoom.save();
      return res
        .status(200)
        .send("You have successfully registered in the game room");
    } else {
      return sendResponse(res, 404, null, "Game room not found");
    }
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
};

module.exports = {
  createGameRoom,
  updateGameRoom,
  deleteGameRoom,
  joinGameRoom,
  leaveGameRoom,
  registerInGameRoom,
  getGameRoomDetails,
};
