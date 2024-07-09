"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayerPositions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerPositions.init(
    {
    
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Players",
          key: "id",
        },
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "GameRooms",
          key: "id",
        },
      },
      current_position_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "BoardPositions",
          key: "position_number",
        },
      },
      token_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PlayerPositions",
    }
  );
  return PlayerPositions;
};
