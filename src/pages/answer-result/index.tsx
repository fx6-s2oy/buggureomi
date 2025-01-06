import { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

import AnswerList from "@/components/answer/AnswerList";
import AnswerDetailDialog from "@/components/answer/dialog/AnswerDetailDialog";
import { Skeleton } from "@/components/ui/skeleton";

import { answerAPI } from "@/api/answer";
import { Answer } from "@/types/answer";
import { GetAnswerListParam } from "@/api/answer/type";

import { useUserStore } from "@/store/userStore";
import { useQuery } from "@/hooks/useQuery";

export default function AnswerResult() {
  const history = useHistory();
  const { userInfo } = useUserStore();

  const query = useQuery();
  const sqidsId = query.get("question");
  const [nickname, setNickname] = useState<string>("");

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

    // COMMENT: strict mode에선 2번 호출로 인한 에러가 뜰 수 있으나, product에선 이슈사항 없음
    // - 중복 호출로 인해 동일 데이터 map key 중복 에러
    // - "start: 2" param 건너 뛰는 현상
    setIsLoading(true);
    try {
      const { data } = sqidsId
        ? await answerAPI.listForGuest({
            sqidsId,
            query: paramRef.current,
          })
        : await answerAPI.list(paramRef.current);

      if (sqidsId) setNickname(data.data.nickname);
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

  // 최초 데이터 호출 & 삭제 후 데이터 호출
  useEffect(() => {
    if (userInfo?.id || sqidsId) {
      if (!answersData.length) getAnswersData();
    } else {
      history.push("member-login");
    }
  }, [userInfo?.id, sqidsId, answersData.length]);

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
    setAnswersData([]);
    setTotalCount(0);
    setHasMore(true);
    paramRef.current = { start: 1, limit: 10 };
    handleDialogToggle();
  };

  return (
    <>
      <div className="text-center pt-20 pb-10 mb-3 text-white">
        <h2 className="text-h2">{userInfo?.nickname || nickname}님의 보따리</h2>
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
          isGuestAccess={!!sqidsId}
        />
      )}
    </>
  );
}
