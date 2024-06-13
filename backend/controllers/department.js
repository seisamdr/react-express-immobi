const models = require("../database/models");
const department = require("../database/models/department");

const createDepartment = async (req, res) => {
  try {
    const create = await models.Department.create(req.body);
    return res.status(201).json({
      department: create,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await models.Department.findAll();
    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const department = await models.Department.findOne({
      where: { id: departmentId },
    });
    if (department) {
      return res.status(200).json({ department });
    }
    return res
      .status(404)
      .send("Department with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const [updated] = await models.Department.update(req.body, {
      where: { id: departmentId },
    });
    if (updated) {
      const updatedDepartment = await models.Department.findOne({
        where: { id: departmentId },
      });
      return res.status(200).json({ department: updatedDepartment });
    }
    throw new Error("Department not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const deleted = await models.Department.destroy({
      where: { id: departmentId },
    });
    if (deleted) {
      return res.status(204).send("Department deleted");
    }
    throw new Error("Department not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
