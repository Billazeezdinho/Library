const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database/sequelize");
const { v4 : UUID} = require('uuid');

class User extends Model {
  static associate(models) {}
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
