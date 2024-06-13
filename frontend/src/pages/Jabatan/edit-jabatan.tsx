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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IDepartment } from "@/types/app";
import { getAllDepartments } from "@/lib/api/call/departmentAPI";

const EditJabatan = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_jabatan: "",
    id_department: "",
  });

  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const { data } = await api.get(`/api/jabatan/${id}`);
        setFormData({
          nama_jabatan: data.jabatan.nama_jabatan,
          id_department: data.jabatan.department.nama_department,
        });
      } catch (error) {
        console.error("Error fetching jabatan", error);
      }
    };

    if (id) {
      fetchJabatan();
    }
  }, [id]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await getAllDepartments();
        setDepartments(result.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/api/jabatan/${id}`, formData);
      navigate("/jabatan");
    } catch (error) {
      console.error("Error updating jabatan:", error);
    }
  };

  const handleCancel = () => {
    navigate("/jabatan");
  };

  return (
    <RootLayout>
      <form onSubmit={handleSubmit} className="w-full min-h-[80.3vh] px-96">
        <div className="text-3xl font-bold flex justify-center py-5">
          Edit Data Jabatan
        </div>
        <div className="w-full flex flex-col pt-10">
          <Label htmlFor="nama_jabatan" className="pb-3 text-[17px]">
            Jabatan
          </Label>
          <Input
            id="nama_jabatan"
            name="nama_jabatan"
            type="text"
            className="border-slate-800"
            value={formData.nama_jabatan}
            onChange={handleInputChange}
          />

          <Label htmlFor="department" className="text-[17px] pt-5 pb-3">
            Departemen
          </Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="border-slate-800">
              <SelectValue placeholder={formData.id_department} />
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

export default EditJabatan;
