const models = require("../database/models");
const karyawan = require("../database/models/karyawan");

const createKaryawan = async (req, res) => {
  try {
    const create = await models.Karyawan.create(req.body);
    return res.status(201).json({
      karyawan: create,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllKaryawan = async (req, res) => {
  try {
    const response = await models.Karyawan.findAll({
      include: [
        {
          model: models.Jabatan,
          as: "jabatan",
          include: [
            {
              model: models.Department,
              as: "department",
            },
          ],
        },
      ],
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getKaryawanById = async (req, res) => {
  try {
    const { karyawanId } = req.params;
    const karyawan = await models.Karyawan.findOne({
      where: { id: karyawanId },
      include: [
        {
          model: models.Jabatan,
          as: "jabatan",
          include: [
            {
              model: models.Department,
              as: "department",
            },
          ],
        },
      ],
    });
    if (karyawan) {
      return res.status(200).json({ karyawan });
    }
    return res
      .status(404)
      .send("Karyawan with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateKaryawan = async (req, res) => {
  try {
    const { karyawanId } = req.params;
    const [updated] = await models.Karyawan.update(req.body, {
      where: { id: karyawanId },
    });
    if (updated) {
      const updatedKaryawan = await models.Karyawan.findOne({
        where: { id: karyawanId },
      });
      return res.status(200).json({ karyawan: updatedKaryawan });
    }
    throw new Error("Karyawan not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteKaryawan = async (req, res) => {
  try {
    const { karyawanId } = req.params;
    const deleted = await models.Karyawan.destroy({
      where: { id: karyawanId },
    });
    if (deleted) {
      return res.status(204).send("Karyawan deleted");
    }
    throw new Error("Karyawan not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createKaryawan,
  getAllKaryawan,
  getKaryawanById,
  updateKaryawan,
  deleteKaryawan,
};
