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
    <div className="min-h-screen w-full bg-[radial-gradient(#232E66_20%,#232E66_100%)]">
      <div className="mx-auto max-w-[500px] min-h-screen text-foreground">
        <div className="px-7">
          <GoBackHeader onBack={onBack} />
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
