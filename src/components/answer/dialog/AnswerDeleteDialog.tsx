import { answerAPI } from "@/api/answer";
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
  targetId: number;
  onSuccess: () => void;
};

export default function AnswerDeleteDialog({
  isOpen,
  onClose,
  targetId,
  onSuccess,
}: Props) {
  const handleDeleteAnswer = async (answerId: number) => {
    await answerAPI.delete({ answerId }).then((res) => {
      const data = res.data;

      if (data.status === "OK") {
        onSuccess();
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 구슬을 깨트릴까요?</AlertDialogTitle>
          <AlertDialogDescription>
            <p>한 번 삭제된 구슬은 되돌릴 수 없어요!</p>
            <p>신중하게 결정하세요!</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteAnswer(targetId)}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
