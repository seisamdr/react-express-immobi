import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RootLayout from "@/layouts/RootLayout";
import api from "@/lib/api";
import { getAllDepartments } from "@/lib/api/call/departmentAPI";
import { IDepartment } from "@/types/app";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJabatan = () => {
  const [formData, setFormData] = useState({
    nama_jabatan: "",
    id_department: "",
  });

  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await getAllDepartments();
        setDepartments(result.data.departments);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      id_department: value,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/api/jabatan", formData);
      navigate("/jabatan");
    } catch (error) {
      console.error("Error creating jabatan:", error);
    }
  };

  const handleCancel = () => {
    navigate("/jabatan");
  };

  return (
    <RootLayout>
      <form className="w-full min-h-[80.3vh] px-96" onSubmit={handleSubmit}>
        <div className="text-3xl font-bold flex justify-center py-5">
          Tambah Jabatan
        </div>
        <div className="w-full flex flex-col pt-10">
          <Label htmlFor="nama_jabatan" className="pb-3 text-[17px]">
            Jabatan
          </Label>
          <Input
            id="nama_jabatan"
            name="nama_jabatan"
            type="text"
            placeholder="Masukkan Jabatan"
            className="border-slate-800"
            value={formData.nama_jabatan}
            onChange={handleChange}
          />

          <Label htmlFor="department" className="text-[17px] pt-5 pb-3">
            Departemen
          </Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="border-slate-800">
              <SelectValue placeholder="Pilih Departemen" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id.toString()}
                >
                  {department.nama_department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

export default AddJabatan;
