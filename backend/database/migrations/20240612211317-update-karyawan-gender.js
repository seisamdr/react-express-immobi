"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Karyawans", "gender", {
      type: Sequelize.CHAR(1),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Karyawans", "gender", {
      type: Sequelize.CHAR,
      allowNull: false,
    });
  },
};
