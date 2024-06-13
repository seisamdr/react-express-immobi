import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RootLayout from "@/layouts/RootLayout";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "@/lib/api";
import { IJabatan } from "@/types/app";
import { getAllJabatan } from "@/lib/api/call/jabatanAPI";
import { IDepartment } from "@/types/app";
import { getAllDepartments } from "@/lib/api/call/departmentAPI";

const AddKaryawan = () => {
  const [formData, setFormData] = useState({
    name: "",
    id_jabatan: "",
    age: "",
    gender: "laki-laki",
    tanggal_lahir: format(new Date(), "yyyy-MM-dd"),
    alamat: "",
  });

  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [jabatans, setJabatans] = useState<IJabatan[]>([]);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Replace with your API call to fetch departments
        const result = await getAllDepartments();
        setDepartments(result.data.departments);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const result = await getAllJabatan();
        setJabatans(result.data.response);
      } catch (error) {
        console.error("Error fetching jabatan:", error);
      }
    };

    if (selectedDepartmentId) {
      fetchJabatan();
    }
  }, [selectedDepartmentId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleSelectDepartmentChange = (value: string) => {
    setSelectedDepartmentId(value);
  };

  const handleSelectJabatanChange = (value: string) => {
    setFormData({
      ...formData,
      id_jabatan: value,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/api/karyawan", formData);
      navigate("/karyawan");
    } catch (error) {
      console.error("Error creating karyawan", error);
    }
  };

  const handleCancel = () => {
    navigate("/karyawan");
  };

  return (
    <RootLayout>
      <form className="w-full min-h-[80.3vh] px-96" onSubmit={handleSubmit}>
        <div className="text-3xl font-bold flex justify-center py-5">
          Tambah Karyawan
        </div>
        <div className="w-full flex flex-col pt-10">
          <Label htmlFor="name" className="pb-3 text-[17px]">
            Nama Lengkap
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Masukkan Nama"
            className="border-slate-800"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="pt-5 flex gap-10 w-full justify-between">
            <div className="flex flex-col gap-2">
              <Label htmlFor="age" className="text-[17px]">
                Usia
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Usia Anda"
                className="border-slate-800"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="gender" className="text-[17px]">
                Jenis Kelamin
              </Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={handleGenderChange}
                className="flex items-center pt-3 gap-5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="L" id="r1" />
                  <Label htmlFor="r1">Laki - Laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="P" id="r2" />
                  <Label htmlFor="r2">Perempuan</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="tanggal_lahir" className="text-[17px]">
                Tanggal Lahir
              </Label>
              <Input
                id="tanggal_lahir"
                name="tanggal_lahir"
                type="date"
                className="border-slate-800"
                value={formData.tanggal_lahir}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <Label htmlFor="alamat" className="text-[17px] pt-5 pb-3">
            Alamat
          </Label>
          <Input
            id="alamat"
            name="alamat"
            type="text"
            placeholder="Masukkan Alamat Lengkap Anda"
            className="border-slate-800"
            value={formData.alamat}
            onChange={handleChange}
          />

          <Label htmlFor="department" className="text-[17px] pt-5 pb-3">
            Department
          </Label>
          <Select onValueChange={handleSelectDepartmentChange}>
            <SelectTrigger className="border-slate-800">
              <SelectValue placeholder="Pilih Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id.toString()}>
                  {dept.nama_department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="jabatan" className="text-[17px] pt-5 pb-3">
            Jabatan
          </Label>
          <Select onValueChange={handleSelectJabatanChange}>
            <SelectTrigger className="border-slate-800">
              <SelectValue placeholder="Pilih Jabatan" />
            </SelectTrigger>
            <SelectContent>
              {jabatans.map((jbtn) => (
                <SelectItem key={jbtn.id} value={jbtn.id.toString()}>
                  {jbtn.nama_jabatan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end mt-10 gap-5">
            <Button
              type="button"
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

export default AddKaryawan;
