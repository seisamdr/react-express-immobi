"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Karyawans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      id_jabatan: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jabatans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.CHAR,
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
      },
      alamat: {
        type: Sequelize.STRING,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Karyawans");
  },
};
