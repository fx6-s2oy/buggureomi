import { ScrollArea } from "@/components/ui/scroll-area";
import TermsOfService from "./terms/TermsOfService";

export default function index() {
  return (
    <>
      <div className="text-center pt-10 pb-5 mb-3 text-white">
        <h2 className="text-h2">회원 가입 약관 동의</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-240px)] rounded-lg">
        <TermsOfService />
      </ScrollArea>
    </>
  );
}
