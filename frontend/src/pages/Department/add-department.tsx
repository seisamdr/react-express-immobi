import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RootLayout from "@/layouts/RootLayout";
import api from "@/lib/api";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    nama_department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/api/department", formData);
      navigate("/department");
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleCancel = () => {
    navigate("/department");
  };

  return (
    <RootLayout>
      <form onSubmit={handleSubmit} className="w-full min-h-[80.3vh] px-96">
        <div className="text-3xl font-bold flex justify-center py-5">
          Tambah Department
        </div>
        <div className="w-full flex flex-col pt-10">
          <Label htmlFor="departmen" className="pb-3 text-[17px]">
            Department
          </Label>
          <Input
            id="departmen"
            name="nama_department"
            type="text"
            placeholder="Masukkan Departemen"
            className="border-slate-800"
            value={formData.nama_department}
            onChange={handleChange}
          />

          <div className="flex justify-end mt-10 gap-5">
            <Button
              className="w-32 text-lg flex items-center py-6"
              onClick={handleCancel}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="w-32 text-lg flex items-center py-6"
            >
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </RootLayout>
  );
};

export default AddDepartment;
