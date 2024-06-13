import { useEffect, useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllKaryawan, deleteKaryawan } from "@/lib/api/call/karyawanAPI";
import { IKaryawan } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const Karyawan = () => {
  const [employee, setEmployee] = useState<IKaryawan[] | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllKaryawan();
      setEmployee(result.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteKaryawan(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting karyawan", error);
    }
  };

  return (
    <RootLayout>
      <div className="w-full min-h-[80.3vh] px-48">
        <div className="text-3xl font-bold flex justify-center py-5">
          Data Karyawan
        </div>
        <div className="flex">
          <Button variant="outline" className="ml-auto my-5 bg-slate-300">
            <Link to="/karyawan/add">Tambah Data</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">No</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Department</TableHead>
              <TableHead className="text-center">Position</TableHead>
              <TableHead className="text-center">Age</TableHead>
              <TableHead className="text-center">Gender</TableHead>
              <TableHead className="text-center">Birthday Date</TableHead>
              <TableHead className="text-center">Address</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee && employee.length > 0 ? (
              employee.map((krywn, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell>{krywn.name}</TableCell>
                  <TableCell className="text-center">
                    {krywn.jabatan?.department?.nama_department}
                  </TableCell>
                  <TableCell className="text-center">
                    {krywn.jabatan?.nama_jabatan}
                  </TableCell>
                  <TableCell className="text-center">{krywn.age}</TableCell>
                  <TableCell className="text-center">{krywn.gender}</TableCell>
                  <TableCell className="text-center">
                    {new Date(krywn.tanggal_lahir).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{krywn.alamat}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center justify-center">
                      <Button variant="outline" className="bg-blue-400">
                        <Link to={`/karyawan/edit/${krywn.id}`}>
                          <TbEdit />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-500"
                        onClick={() => handleDelete(krywn.id)}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Data Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RootLayout>
  );
};

export default Karyawan;
