const models = require("../database/models");
const jabatan = require("../database/models/jabatan");

const createJabatan = async (req, res) => {
  try {
    const create = await models.Jabatan.create(req.body);
    return res.status(201).json({
      jabatan: create,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllJabatan = async (req, res) => {
  try {
    const response = await models.Jabatan.findAll({
      include: [
        {
          model: models.Department,
          as: "department",
        },
      ],
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getJabatanById = async (req, res) => {
  try {
    const { jabatanId } = req.params;
    const jabatan = await models.Jabatan.findOne({
      where: { id: jabatanId },
      include: [
        {
          model: models.Department,
          as: "department",
        },
      ],
    });
    if (jabatan) {
      return res.status(200).json({ jabatan });
    }
    return res
      .status(404)
      .send("Jabatan with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateJabatan = async (req, res) => {
  try {
    const { jabatanId } = req.params;
    const [updated] = await models.Jabatan.update(req.body, {
      where: { id: jabatanId },
    });
    if (updated) {
      const updatedJabatan = await models.Jabatan.findOne({
        where: { id: jabatanId },
      });
      return res.status(200).json({ jabatan: updatedJabatan });
    }
    throw new Error("Jabatan not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteJabatan = async (req, res) => {
  try {
    const { jabatanId } = req.params;
    const deleted = await models.Jabatan.destroy({
      where: { id: jabatanId },
    });
    if (deleted) {
      return res.status(204).send("Jabatan deleted");
    }
    throw new Error("Jabatan not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createJabatan,
  getAllJabatan,
  getJabatanById,
  updateJabatan,
  deleteJabatan,
};
