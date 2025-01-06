import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mainPageApi } from "@/api/main";
import { MainPageInfo } from "@/types/main-page";
import { useUserStore } from "@/store/userStore";
import { useSnowStore } from "@/store/snowStore";
import { ShareDialog } from "@/components/share/ShareDialog";
import WithoutAnswer from "./components/WithoutAnswer";
import WithAnswer from "./components/WithAnswer";
import { DialogProvider } from "@/contexts/DialogContext";
import { useLoginCheck } from "@/hooks/useLoginCheck";
import { Skeleton } from "@/components/ui/skeleton";

export default function Main() {
  const [mainPageInfo, setMainPageInfo] = useState<MainPageInfo>();

  const { isLogin } = useLoginCheck();
  const { userInfo } = useUserStore();
  const { setColorCodeList } = useSnowStore();

  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      history.replace("/member-login");
    }
    if (userInfo?.id) {
      mainPageApi.getInfo().then((res) => {
        const data = res.data.data;
        if (!data) {
          history.replace("/question-create"); // todo: 질문을 아직 만들지 않았을 때 리다이렉션 잘되는지 확인 필요
          return;
        }
        setColorCodeList(data.colorCodeList);
        setMainPageInfo(data);
      });
    }
  }, [userInfo?.id, history, isLogin, setColorCodeList]);

  return (
    <div className="flex flex-col h-full">
      {!mainPageInfo ? (
        <div className="flex flex-col h-full gap-4 justify-center">
          <Skeleton className="w-full h-10 bg-gray-400" />
          <Skeleton className="w-full h-10 bg-gray-400" />
          <Skeleton className="w-full h-80 bg-gray-400" />
          <div className="flex justify-center items-center py-10">
            <Skeleton className="w-full h-10 bg-gray-400" />
          </div>
        </div>
      ) : (
        userInfo?.id && (
          <DialogProvider>
            <div className="flex flex-col h-full">
              {mainPageInfo.totalCount < 1 ? (
                <WithoutAnswer
                  userId={userInfo.id}
                  questionContent={mainPageInfo.content}
                  nickname={mainPageInfo.nickname}
                />
              ) : (
                <WithAnswer userId={userInfo.id} mainPageInfo={mainPageInfo} />
              )}
            </div>
            <ShareDialog userId={userInfo.id} />
          </DialogProvider>
        )
      )}
    </div>
  );
}
