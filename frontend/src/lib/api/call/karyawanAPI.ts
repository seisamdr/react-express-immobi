import API from "..";

export const createKaryawan = async (body: {
  nama: string;
  id_jabatan: number;
  age: number;
  gender: string;
  tanggal_lahir: Date;
  alamat: string;
}) => {
  const formData = new FormData();
  formData.append("name", body.nama);
  formData.append("id_jabatan", String(body.id_jabatan));
  formData.append("age", String(body.age));
  formData.append("gender", body.gender);
  formData.append("tanggal_lahir", body.tanggal_lahir.toISOString());
  formData.append("alamat", body.alamat);

  return await API.post("/api/karyawan", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllKaryawan = async () => {
  return await API.get("/api/karyawan");
};

export const getKaryawanById = async (id: number) => {
  return await API.get(`/api/karyawan/${id}`);
};

export const updateKaryawan = async (
  id: number,
  body: {
    name: string;
    id_jabatan: number;
    age: number;
    gender: string;
    tanggal_lahir: Date;
    alamat: string;
  }
) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("id_jabatan", String(body.id_jabatan));
  formData.append("age", String(body.age));
  formData.append("gender", body.gender);
  formData.append("tanggal_lahir", body.tanggal_lahir.toISOString());
  formData.append("alamat", body.alamat);

  return await API.put(`/api/karyawan/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteKaryawan = async (id: number) => {
  return await API.delete(`/api/karyawan/${id}`);
};
