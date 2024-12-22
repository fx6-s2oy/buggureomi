import { answerAPI } from "@/api/answer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
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
        <AlertDialogHeader className="text-[24px] mt-3 mb-5">
          <h2>
            깨진 구슬은 <strong>복구할 수 없어요!</strong>
          </h2>
          <h2>정말 구슬을 깨트릴까요?</h2>
          <AlertDialogDescription>
            <p>신중하게 결정하세요!</p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={() => handleDeleteAnswer(targetId)}>
            삭제
          </AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
