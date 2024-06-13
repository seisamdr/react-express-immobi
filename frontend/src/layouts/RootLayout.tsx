import CommonFooter from "@/components/common/common-footer";
import CommonHeader from "@/components/common/common-header";

interface IProps {
  children?: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div>
      <CommonHeader />
      <div className="pt-28">{children}</div>
      <CommonFooter />
    </div>
  );
};

export default RootLayout;
