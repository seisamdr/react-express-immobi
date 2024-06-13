const { Router } = require("express");
const departmenController = require("../controllers/department");
const jabatanController = require("../controllers/jabatan");
const karyawanController = require("../controllers/karyawan");

const router = Router();

router.get("/", (req, res) => res.send("Welcome"));

// Department
router.post("/department", departmenController.createDepartment);
router.get("/department", departmenController.getAllDepartments);
router.get("/department/:departmentId", departmenController.getDepartmentById);
router.put("/department/:departmentId", departmenController.updateDepartment);
router.delete(
  "/department/:departmentId",
  departmenController.deleteDepartment
);

// Jabatan
router.post("/jabatan", jabatanController.createJabatan);
router.get("/jabatan", jabatanController.getAllJabatan);
router.get("/jabatan/:jabatanId", jabatanController.getJabatanById);
router.put("/jabatan/:jabatanId", jabatanController.updateJabatan);
router.delete("/jabatan/:jabatanId", jabatanController.deleteJabatan);

// Karyawan
router.post("/karyawan", karyawanController.createKaryawan);
router.get("/karyawan", karyawanController.getAllKaryawan);
router.get("/karyawan/:karyawanId", karyawanController.getKaryawanById);
router.put("/karyawan/:karyawanId", karyawanController.updateKaryawan);
router.delete("/karyawan/:karyawanId", karyawanController.deleteKaryawan);

module.exports = router;
