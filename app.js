const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const { log } = require("./config/core");

const userRoutes = require("./routes/auth.route");
const gameRoom = require("./routes/gameRoom.route");
const boardPosition = require("./routes/boardPosition.route");
const qrCode = require("./routes/qrCode.route");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: false }).then(async () => {
  log("Database re-synchronizied successfully...", "info");
});

app.get("/", (req, res) => res.send("Hey the server is working fine!"));

app.use("/api/users", userRoutes);
app.use("/api/game-room", gameRoom);
app.use("/api/board-position", boardPosition);
app.use("/api/qr-code", qrCode);
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

app.listen(PORT, log("Server is running on port: " + PORT, "info", "green"));
