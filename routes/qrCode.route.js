const express = require("express");
const authenticate = require("../middlewares/authorization.middleware");
const { generateQR } = require("../middlewares/qrGenerator.middleware");
const gameRoom = require("../controllers/qrCode.controller");

const router = express.Router();

//create qr code
router.post("/create-qr-code", authenticate, generateQR, gameRoom.createQrCode);
//update qr code
router.put("/update-qr-code/:id", authenticate, gameRoom.updateQrCode);
//get qr code details
router.get("/qr-code-details/:id", authenticate, gameRoom.getQrCode);
//get all qr codes
router.get("/all-qr-codes", authenticate, gameRoom.getAllQrCodes);
//update qr code
router.put("/update-qr-code/:id", authenticate, gameRoom.updateQrCode);
module.exports = router;
