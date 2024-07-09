const bcrypt = require("bcrypt");
const db = require("../models");
const { log, sendResponse } = require("../config/core");

const createBoardPosition = async (req, res) => {
  try {
    const { position_name, position_description, position_type } =
      req.body;

    const data = {
      position_name,
      position_description: position_description || null,
      position_type,
    };

    const boardPosition = await db.boardpositions.create(data);

    if (boardPosition) {
      return sendResponse(res, 201, boardPosition, "Board position created successfully");
    }

    return sendResponse(res, 400, null, "Failed to create board position");
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
}

const updateBoardPosition = async (req, res) => {
  try {
    const { position_id } = req.params;
    const { position_name, position_description, position_type } = req.body;
    const boardPosition = await db.boardpositions.findOne({ where: { id: position_id } });

    if (boardPosition) {
      boardPosition.position_name = position_name || boardPosition.position_name;
      boardPosition.position_description = position_description || boardPosition.position_description;
      boardPosition.position_type = position_type || boardPosition.position_type;
      await boardPosition.save();
      return sendResponse(res, 200, boardPosition, "Board position updated successfully");
    }
    else
      return sendResponse(res, 404, null, "Board position not found");
  }
  catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
}

const getBoardPositionDetails = async (req, res) => {
  try {
    const { position_id } = req.params;
    const boardPosition = await db.boardpositions.findOne({ where: { id: position_id } });

    if (boardPosition) {
      return sendResponse(res, 200, boardPosition, "Board position details fetched successfully");
    }
    else
      return sendResponse(res, 404, null, "Board position not found");
  }
  catch (error) {
    log(error, "error");
    return sendResponse(res, 500, null, "Internal server error");
  }
}

module.exports = {
  createBoardPosition,
  updateBoardPosition,
  getBoardPositionDetails, 
};
