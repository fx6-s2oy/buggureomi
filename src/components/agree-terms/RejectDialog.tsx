import { useHistory } from "react-router-dom";
import { useLoginCheck } from "@/hooks/useLoginCheck";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RejectDialog({ isOpen, onClose }: Props) {
  const history = useHistory();
  const { userLogClear } = useLoginCheck();

  const handleTermsReject = async () => {
    userLogClear();
    history.push("/member-login");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader className="mt-3 mb-5">
          <AlertDialogTitle className="!text-h2">
            <p>약관 동의를 거부하시겠습니까?</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>거부하실 경우 서비스 이용에 제약이 있습니까?</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={handleTermsReject}>
            거부
          </AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
