import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RootLayout from "@/layouts/RootLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <RootLayout>
      <div className="flex justify-center items-center min-h-[80.3vh]">
        <div className="flex flex-wrap justify-center gap-9">
          <Link to="/karyawan">
            <Card>
              <CardHeader>
                <CardTitle>Karyawan</CardTitle>
                <CardDescription>
                  <img
                    src="/employee.png"
                    className="object-contain h-48 w-48 p-5"
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/jabatan">
            <Card>
              <CardHeader>
                <CardTitle>Jabatan</CardTitle>
                <CardDescription>
                  <img
                    src="/jabatan.png"
                    className="object-contain h-48 w-48 p-5"
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/department">
            <Card>
              <CardHeader>
                <CardTitle>Department</CardTitle>
                <CardDescription>
                  <img
                    src="/department.png"
                    className="object-contain h-48 w-48 p-5"
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
