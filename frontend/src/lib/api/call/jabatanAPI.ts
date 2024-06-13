import API from "..";

export const createJabatan = async (body: {
  id_department: number;
  nama_jabatan: string;
}) => {
  const formData = new FormData();
  formData.append("id_department", String(body.id_department));
  formData.append("nama_jabatan", body.nama_jabatan);

  return await API.post("/api/jabatan", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllJabatan = async () => {
  return await API.get("/api/jabatan");
};

export const getJabatanById = async (id: number) => {
  return await API.get(`/api/jabatan/${id}`);
};

export const updateJabatan = async (
  id: number,
  body: { id_department: number; nama_jabatan: string }
) => {
  const formData = new FormData();
  formData.append("id_department", String(body.id_department));
  formData.append("nama_jabatan", body.nama_jabatan);

  return await API.put(`/api/jabatan/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteJabatan = async (id: number) => {
  return await API.delete(`/api/jabatan/${id}`);
};
