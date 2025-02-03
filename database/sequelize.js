const Sequelize = require('sequelize');


const sequelize = new Sequelize('sql5760447', 'sql5760447', 'x5suz5d1Q8', {
    host: 'sql5.freesqldatabase.com',
    dialect: 'mysql'
  });

  module.exports = sequelize;