import { Button } from "@/components/ui/button";

export default function CSCenterButton() {
  const handleGoToCSCenter = () => {
    window.open(
      "https://docs.google.com/forms/d/14AvX8JFyLGRBz5u2WwrI68V0J6KhnKH2oBJ09nEF0Ik/viewform?edit_requested=true"
    );
  };

  return (
    <Button
      className="w-16 h-10 text-sm px-0 border-b-2 rounded-none border-white bg-transparent"
      onClick={handleGoToCSCenter}
    >
      문의하기
    </Button>
  );
}
