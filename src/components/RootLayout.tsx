import { useHistory } from "react-router-dom";
import GoBackHeader from "./go-back-header/GoBackHeader";
import { Toaster } from "./ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const history = useHistory();
  const onBack = () => {
    history.push("/main");
  };

  return (
    <div className="mx-auto max-w-[540px] min-h-screen bg-background text-foreground px-7">
      <GoBackHeader onBack={onBack}></GoBackHeader>
      {children}
      <Toaster />
    </div>
  );
}
