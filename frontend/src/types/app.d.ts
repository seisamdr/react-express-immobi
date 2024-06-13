export type IKaryawan = {
  id: number;
  name: string;
  jabatan: IJabatan;
  age: number;
  gender: string;
  tanggal_lahir: Date;
  alamat: string;
};

export type IJabatan = {
  id: number;
  department: IDepartment;
  nama_jabatan: string;
};

export type IDepartment = {
  id: number;
  nama_department: string;
};
