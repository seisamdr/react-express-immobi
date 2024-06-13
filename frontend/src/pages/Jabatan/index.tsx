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
import { deleteJabatan, getAllJabatan } from "@/lib/api/call/jabatanAPI";
import { IJabatan } from "@/types/app";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export function Jabatan() {
  const [position, setPosition] = useState<IJabatan[] | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllJabatan();
      setPosition(result.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJabatan(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting jabatan", error);
    }
  };

  return (
    <RootLayout>
      <div className="w-full min-h-[80.3vh] px-96">
        <div className="text-3xl font-bold flex justify-center py-5">
          Data Jabatan
        </div>
        <div className="flex">
          <Button variant="outline" className="ml-auto my-5 bg-slate-300">
            <Link to="/jabatan/add">Tambah Data</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">No</TableHead>
              <TableHead className="text-center">Department</TableHead>
              <TableHead className="text-center">Job Title</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {position && position.length > 0 ? (
              position.map((pstn, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {pstn.department?.nama_department}
                  </TableCell>
                  <TableCell className="text-center">
                    {pstn.nama_jabatan}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center justify-center">
                      <Button variant="outline" className="bg-blue-400">
                        <Link to={`/jabatan/edit/${pstn.id}`}>
                          <TbEdit />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-500"
                        onClick={() => handleDelete(pstn.id)}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
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
