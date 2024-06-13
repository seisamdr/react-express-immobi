import API from "..";

export const createDepartment = async (body: { nama_department: string }) => {
  const formData = new FormData();
  formData.append("nama_department", body.nama_department);

  return await API.post("/api/department", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllDepartments = async () => {
  return await API.get("/api/department");
};

export const getDepartmentById = async (id: number) => {
  return await API.get(`/api/department/${id}`);
};

export const updateDepartment = async (
  id: number,
  body: { nama_department: string }
) => {
  const formData = new FormData();
  formData.append("nama_department", body.nama_department);

  return await API.put(`/api/department/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDepartment = async (id: number) => {
  return await API.delete(`/api/department/${id}`);
};
