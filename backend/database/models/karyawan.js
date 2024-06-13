"use strict";
module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define(
    "Karyawan",
    {
      name: DataTypes.STRING,
      id_jabatan: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      tanggal_lahir: DataTypes.DATEONLY,
      alamat: DataTypes.STRING,
    },
    {}
  );

  Karyawan.associate = function (models) {
    Karyawan.belongsTo(models.Jabatan, {
      foreignKey: "id_jabatan",
      as: "jabatan",
      onDelete: "CASCADE",
    });
  };

  return Karyawan;
};
