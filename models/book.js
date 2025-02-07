const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../database/sequelize');

  class book extends Model {
    static associate(models) {
  
    }
  }
  book.init({
    id:{ type:DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    author: {
      type:DataTypes.STRING,
      allowNull:false
    },
    published_year: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    genre: {
      type:DataTypes.STRING,
      allowNull:false
    },
    added_by: {
      type:DataTypes.UUID,
      allowNull:false,
      references:{
        model: 'User',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'book',
    tableName: 'books',    
    timestamps: true,

  });
  
  module.exports = book;