import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { mainPageApi } from "@/api/main";
import { MainPageInfo } from "@/types/main-page";
import { useUserStore } from "@/store/userStore";
import { useSnowStore } from "@/store/snowStore";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "@/components/share/ShareDialog";
import WithoutAnswer from "./components/WithoutAnswer";
import WithAnswer from "./components/WithAnswer";
import { DialogProvider } from "@/contexts/DialogContext";

export default function Main() {
  const [mainPageInfo, setMainPageInfo] = useState<MainPageInfo>();

  const { userInfo } = useUserStore();
  const { setColorCodeList } = useSnowStore();

  const history = useHistory();

  useEffect(() => {
    if (userInfo?.id) {
      mainPageApi.getInfo().then((res) => {
        const data = res.data.data;
        if (!data) {
          history.replace("/question-create"); // todo: 질문을 아직 만들지 않았을 때 리다이렉션 잘되는지 확인 필요
          return null;
        }
        setColorCodeList(data.colorCodeList);
        setMainPageInfo(data);
      });
    }
  }, [userInfo, history, setColorCodeList]);

  const hasUserId = userInfo?.id != null;

  return (
    <div className="flex flex-col h-full">
      {!hasUserId ? (
        <Redirect to="/member-login" />
      ) : !mainPageInfo ? (
        <div className="flex flex-col justify-between flex-grow text-white">
          <div className="flex flex-col flex-grow justify-center items-center p-5">
            <p className="mb-4 text-h5">질문을 아직 만들지 않았어요!</p>
          </div>
          <footer className="flex justify-center items-center py-10">
            <Button
              className="w-full"
              onClick={() => history.replace("/question-create")}
            >
              질문 만들러가기
            </Button>
          </footer>
        </div>
      ) : (
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
      )}
    </div>
  );
}
