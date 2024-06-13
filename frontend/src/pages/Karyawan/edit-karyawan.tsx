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
import api from "@/lib/api";
import { getAllDepartments } from "@/lib/api/call/departmentAPI";
import { getAllJabatan } from "@/lib/api/call/jabatanAPI";
import { IDepartment, IJabatan } from "@/types/app";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditKaryawan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    nama_jabatan: "",
    nama_department: "",
    age: "",
    gender: "laki-laki",
    tanggal_lahir: format(new Date(), "yyyy-MM-dd"),
    alamat: "",
  });

  const [jabatans, setJabatans] = useState<IJabatan[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const { data } = await api.get(`/api/karyawan/${id}`);
        setFormData({
          name: data.karyawan.name,
          nama_jabatan: data.karyawan.jabatan.nama_jabatan,
          nama_department: data.karyawan.jabatan.department.nama_department,
          age: data.karyawan.age,
          gender: data.karyawan.gender,
          tanggal_lahir: data.karyawan.tanggal_lahir,
          alamat: data.karyawan.alamat,
        });
      } catch (error) {
        console.error("Error fetching karyawan", error);
      }
    };

    if (id) {
      fetchKaryawan();
    }
  }, [id]);

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const result = await getAllJabatan();
        setJabatans(result.data.response);
        console.log(
          "🚀 ~ fetchJabatan ~ result.data.response:",
          result.data.response
        );
      } catch (error) {
        console.error("Error fetching jabatan:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const result = await getAllDepartments();
        setDepartments(result.data.departments);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchJabatan();
    fetchDepartments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectJabatanChange = (value: string) => {
    setFormData({
      ...formData,
      nama_jabatan: value,
    });
  };

  const handleSelectDepartmentChange = (value: string) => {
    setFormData({
      ...formData,
      nama_department: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/api/karyawan/${id}`, formData);
      navigate("/karyawan");
    } catch (error) {
      console.error("Error updating karyawan", error);
    }
  };

  const handleCancel = () => {
    navigate("/karyawan");
  };

  return (
    <RootLayout>
      <form onSubmit={handleSubmit} className="w-full min-h-[80.3vh] px-96">
        <div className="text-3xl font-bold flex justify-center py-5">
          Edit Data Karyawan
        </div>
        <div className="w-full flex flex-col pt-10">
          <Label htmlFor="name" className="pb-3 text-[17px]">
            Nama Lengkap
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="border-slate-800"
            value={formData.name}
            onChange={handleInputChange}
          />

          <div className="pt-5 flex gap-10 w-full justify-between">
            <div className="flex flex-col gap-2">
              <Label htmlFor="age" className="text-[17px]">
                Usia
              </Label>
              <Input
                id="age"
                name="age"
                type="text"
                className="border-slate-800"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[17px]">Jenis Kelamin</Label>
              <RadioGroup
                value={formData.gender}
                onChange={handleGenderChange}
                className="flex items-center pt-3 gap-5"
              >
                <RadioGroupItem value="L" id="r1" />
                <Label htmlFor="r1">Laki - Laki</Label>
                <RadioGroupItem value="P" id="r2" />
                <Label htmlFor="r2">Perempuan</Label>
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
            onChange={handleInputChange}
          />

          <Label htmlFor="id_department" className="text-[17px] pt-5 pb-3">
            Department
          </Label>
          <Select onValueChange={handleSelectDepartmentChange}>
            <SelectTrigger className="border-slate-800">
              <SelectValue placeholder={formData.nama_department} />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id.toString()}>
                  {dept.nama_department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="id_jabatan" className="text-[17px] pt-5 pb-3">
            Jabatan
          </Label>
          <Select onValueChange={handleSelectJabatanChange}>
            <SelectTrigger className="border-slate-800">
              <SelectValue placeholder={formData.nama_jabatan} />
            </SelectTrigger>
            <SelectContent>
              {jabatans.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.nama_jabatan}
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

export default EditKaryawan;
