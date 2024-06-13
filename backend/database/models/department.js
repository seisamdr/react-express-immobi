"use strict";
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      nama_department: DataTypes.STRING,
    },
    {}
  );

  Department.associate = function (models) {
    Department.hasMany(models.Jabatan, {
      foreignKey: "id_department",
      as: "jabatans",
      onDelete: "CASCADE",
    });
  };

  return Department;
};
