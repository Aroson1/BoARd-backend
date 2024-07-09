const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.cjs");
const { log } = require("../config/core");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  { dialect: "postgres" }
);

sequelize
  .authenticate()
  .then(() => {
    log(`Database connected successfully...`, "info");
  })
  .catch((err) => {
    log(err, "error");
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.players = require("./player")(sequelize, DataTypes);
db.gamerooms = require("./gameRooms")(sequelize, DataTypes);
db.qrcodes = require("./qrcodes")(sequelize, DataTypes);
db.boardpositions = require("./boardPositions")(sequelize, DataTypes);

db.playerpositions = require("./playerPositions")(sequelize, DataTypes);


module.exports = db;
