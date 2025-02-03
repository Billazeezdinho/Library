"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull:true
      },
      author: {
        type: Sequelize.STRING,
        allowNull:true
      },
      published_year: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      genre: {
        type: Sequelize.STRING,
        allowNull:true
      },
      added_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
        model: "Users",
        key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};
