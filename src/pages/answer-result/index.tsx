import { useEffect, useState } from "react";

import AnswerList from "@/components/answer/AnswerList";
import AnswerDetailDialog from "@/components/answer/dialog/AnswerDetailDialog";

import { answerAPI } from "@/api/answer";
import { Answer } from "@/types/answer";

import { useUserStore } from "@/store/userStore";

export default function AnswerResult() {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Answer | null>(null);

  const [answersData, setAnswersData] = useState<Answer[]>();

  const getAnswersData = async (userId: number) => {
    await answerAPI.list({ userId }).then((res) => {
      const data = res.data;

      if (data.status === "OK" && data.data.list) {
        setAnswersData(data.data.list);
      }
    });
  };

  const { userInfo } = useUserStore();
  useEffect(() => {
    if (userInfo?.id) getAnswersData(userInfo.id);
  }, [userInfo]);

  const handleDialogToggle = (marble?: Answer) => {
    setIsDetailDialogOpen(!isDetailDialogOpen);

    if (marble) {
      setSelectedItem(marble);
    }
  };

  const handleDeleteSuccess = () => {
    handleDialogToggle();
    if (userInfo?.id) getAnswersData(userInfo.id);
  };

  return (
    <>
      <div>
        <div className="text-center pt-20 pb-10 mb-3">
          <h2 className="text-h2 text-primary">사용자님의 보따리</h2>
          <h5 className="text-h5">
            {answersData ? answersData.length : 0}개의 답변이 담겨 있어요!
          </h5>
        </div>
        {answersData && (
          <AnswerList
            listData={answersData}
            onDialogOpen={handleDialogToggle}
          />
        )}
      </div>
      {selectedItem && (
        <AnswerDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={handleDialogToggle}
          data={selectedItem}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
}
