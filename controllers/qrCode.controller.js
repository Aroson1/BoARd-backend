const bcrypt = require("bcrypt");
const db = require("../models");
const { log, sendResponse } = require("../config/core");

const createQrCode = async (req, res) => {
  try {
    const { code, gameroom_id, created_by, expires_at, image } = req.body;
    const qrCode = await db.QrCodes.create({
      code,
      gameroom_id,
      created_by,
      expires_at,
      image,
    });
    return sendResponse(res, 201, qrCode);
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, error);
  }
};
const getAllQrCodes = async (req, res) => {
  try {
    const qrCodes = await db.QrCodes.findAll();
    return sendResponse(res, 200, qrCodes);
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, error);
  }
};

const getQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const qrCode = await db.QrCodes.findOne({ where: { id } });
    if (!qrCode) {
      return sendResponse(res, 404, "QrCode not found");
    }
    return sendResponse(res, 200, qrCode);
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, error);
  }
};

const updateQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, gameroom_id, created_by, expires_at, image } = req.body;
    const qrCode = await db.QrCodes.findOne({ where: { id } });
    if (!qrCode) {
      return sendResponse(res, 404, "QrCode not found");
    }
    qrCode.code = code || qrCode.code;
    qrCode.gameroom_id = gameroom_id || qrCode.gameroom_id;
    qrCode.created_by = created_by || qrCode.created_by;
    qrCode.expires_at = expires_at || qrCode.expires_at;
    qrCode.image = image || qrCode.image;
    await qrCode.save();
    return sendResponse(res, 200, qrCode);
  } catch (error) {
    log(error, "error");
    return sendResponse(res, 500, error);
  }
};

module.exports = {
  createQrCode,
  getAllQrCodes,
  getQrCode,
  updateQrCode,
};
