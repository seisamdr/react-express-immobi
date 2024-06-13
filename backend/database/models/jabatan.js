"use strict";
module.exports = (sequelize, DataTypes) => {
  const Jabatan = sequelize.define(
    "Jabatan",
    {
      id_department: DataTypes.INTEGER,
      nama_jabatan: DataTypes.STRING,
    },
    {}
  );

  Jabatan.associate = function (models) {
    Jabatan.belongsTo(models.Department, {
      foreignKey: "id_department",
      as: "department",
      onDelete: "CASCADE",
    });

    Jabatan.hasMany(models.Karyawan, {
      foreignKey: "id_jabatan",
      as: "karyawans",
      onDelete: "CASCADE",
    });
  };

  return Jabatan;
};
