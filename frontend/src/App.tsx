import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddKaryawan from "./pages/Karyawan/add-karyawan";
import EditKaryawan from "./pages/Karyawan/edit-karyawan";
import { Jabatan } from "./pages/Jabatan";
import AddJabatan from "./pages/Jabatan/add-jabatan";
import EditJabatan from "./pages/Jabatan/edit-jabatan";
import { Department } from "./pages/Department";
import AddDepartment from "./pages/Department/add-department";
import EditDepartment from "./pages/Department/edit-department";
import Karyawan from "./pages/Karyawan";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/karyawan" element={<Karyawan />} />
      <Route path="/karyawan/add" element={<AddKaryawan />} />
      <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />

      <Route path="/jabatan" element={<Jabatan />} />
      <Route path="/jabatan/add" element={<AddJabatan />} />
      <Route path="/jabatan/edit/:id" element={<EditJabatan />} />

      <Route path="/department" element={<Department />} />
      <Route path="/department/add" element={<AddDepartment />} />
      <Route path="/department/edit/:id" element={<EditDepartment />} />
    </Routes>
  );
};

export default App;
