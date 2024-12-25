import Header from "@/widgets/header/Header";
import { Toaster } from "./ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle,#3e4d96_20%,#161f49_100%)]">
      <div className="mx-auto max-w-[500px] min-h-screen text-foreground">
        <div className="px-7">
          <Header />
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
