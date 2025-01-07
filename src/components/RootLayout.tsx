import Header from "@/widgets/header/Header";
import { Toaster } from "./ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] w-full">
      <div className="mx-auto w-full max-w-[500px] min-h-[100dvh] text-foreground">
        <div className="px-5">
          <Header />
          <div className="px-5 h-[calc(100dvh-70px)]">
            {children}
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
