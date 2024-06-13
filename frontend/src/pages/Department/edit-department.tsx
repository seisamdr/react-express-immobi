import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RootLayout from "@/layouts/RootLayout";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_department: "",
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const { data } = await api.get(`/api/department/${id}`);
        setFormData({
          nama_department: data.department.nama_department,
        });
      } catch (error) {
        console.error("Error fetching department", error);
      }
    };

    if (id) {
      fetchDepartment();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate("/department");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/api/department/${id}`, formData);
      navigate("/department");
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <RootLayout>
      <form onSubmit={handleSubmit} className="w-full min-h-[80.3vh] px-96">
        <div className="text-3xl font-bold flex justify-center py-5">
          Edit Data Department
        </div>
        <div className="w-full flex flex-col pt-10">
          <Label htmlFor="department" className="pb-3 text-[17px]">
            Department
          </Label>
          <Input
            id="department"
            name="nama_department"
            type="text"
            className="border-slate-800"
            value={formData.nama_department}
            onChange={handleInputChange}
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

export default EditDepartment;
