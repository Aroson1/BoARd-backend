"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QrCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QrCodes.init(
    {
      code: DataTypes.STRING,
      gameroom_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'GameRooms',
          key: 'id'
        }
      },
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Players',
          key: 'id'
        }
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true      
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "QrCodes",
    }
  );
  return QrCodes;
};
