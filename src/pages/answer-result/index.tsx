import { useEffect, useState, useRef, useCallback } from "react";

import AnswerList from "@/components/answer/AnswerList";
import AnswerDetailDialog from "@/components/answer/dialog/AnswerDetailDialog";
import { Skeleton } from "@/components/ui/skeleton";

import { answerAPI } from "@/api/answer";
import { Answer } from "@/types/answer";
import { GetAnswerListParam } from "@/api/answer/type";

import { useUserStore } from "@/store/userStore";

export default function AnswerResult() {
  const { userInfo } = useUserStore();

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Answer | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [answersData, setAnswersData] = useState<Answer[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const paramRef = useRef<GetAnswerListParam>({
    start: 1,
    limit: 10,
  });

  // API 호출 함수
  const getAnswersData = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { data } = await answerAPI.list(paramRef.current);

      if (data.status === "OK" && data.data.list) {
        // totalCount는 최초에만 설정
        if (!totalCount) {
          setTotalCount(data.data.totalCount);
        }

        const newAnswers = data.data.list;
        setAnswersData((prev) => [...prev, ...newAnswers]);

        // 마지막 페이지인지 체크
        if (data.data.currentPage === data.data.totalPage) {
          setHasMore(false);
        }
        // param 업데이트
        paramRef.current = {
          ...paramRef.current,
          start: paramRef.current.start + 1,
        };
      }
    } catch (error) {
      console.error("Failed to get answerList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 최초 데이터 호출
  useEffect(() => {
    if (userInfo?.id) {
      getAnswersData();
    }
  }, [userInfo?.id]);

  // 무한 스크롤 핸들러
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

      if (
        scrollHeight - scrollTop <= clientHeight * 1.2 &&
        !isLoading &&
        hasMore
      ) {
        getAnswersData();
      }
    },
    [isLoading, hasMore]
  );

  // 상세보기 및 삭제 기능
  const handleDialogToggle = (marble?: Answer) => {
    setIsDetailDialogOpen(!isDetailDialogOpen);

    if (marble) {
      setSelectedItem(marble);
    }
  };

  const handleDeleteSuccess = () => {
    handleDialogToggle();
    setAnswersData([]);
    paramRef.current = { start: 1, limit: 10 };
    setHasMore(true);
    if (userInfo?.id) getAnswersData();
  };

  return (
    <>
      <div className="text-center pt-20 pb-10 mb-3 text-white">
        <h2 className="text-h2">{userInfo?.nickname}님의 보따리</h2>
        <h2 className="text-h2">{totalCount}개의 답변이 담겨 있어요!</h2>
      </div>

      <div
        className="h-[calc(100vh-350px)] overflow-auto"
        onScroll={handleScroll}
      >
        <AnswerList listData={answersData} onDialogOpen={handleDialogToggle} />

        {isLoading && (
          <Skeleton className="w-[calc(100%-1.5rem)] h-28 mx-auto mt-4 bg-gray-400" />
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
