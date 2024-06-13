import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RootLayout from "@/layouts/RootLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IDepartment } from "@/types/app";
import {
  deleteDepartment,
  getAllDepartments,
} from "@/lib/api/call/departmentAPI";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export function Department() {
  const [department, setDepartment] = useState<IDepartment[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllDepartments();
      setDepartment(result.data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDepartment(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <RootLayout>
      <div className="w-full min-h-[80.3vh] px-[600px]">
        <div className="text-3xl font-bold flex justify-center py-5">
          Data Jabatan
        </div>
        <div className="flex">
          <Button variant="outline" className="ml-auto my-5 bg-slate-300">
            <Link to="/department/add">Tambah Data</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">No</TableHead>
              <TableHead className="text-center">Department</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {department && department.length > 0 ? (
              department.map((dprt, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {dprt.nama_department}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center justify-center">
                      <Button variant="outline" className="bg-blue-400">
                        <Link to={`/department/edit/${dprt.id}`}>
                          <TbEdit />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-500"
                        onClick={() => handleDelete(dprt.id)}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Data Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RootLayout>
  );
}
