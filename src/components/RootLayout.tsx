import Header from "@/widgets/header/Header";
import { Toaster } from "./ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full ">
      <div className="mx-auto w-full max-w-[500px] min-h-screen text-foreground">
        <div className="px-5">
          <Header />
          <div className="px-5 h-[calc(100vh-70px)]">
            {children}
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
