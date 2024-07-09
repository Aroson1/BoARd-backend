"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameRooms.init(
    {
      room_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      room_description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      max_players: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 
      },
      room_host: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id'
        }
      },
      game_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active_player_ids:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: []
      },      
      registered_player_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
        
      },
    },
    {
      sequelize,
      modelName: "GameRooms",
    }
  );
  return GameRooms;
};
