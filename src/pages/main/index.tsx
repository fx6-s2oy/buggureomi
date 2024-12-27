import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { mainPageApi } from "@/api/main";
import { MainPageInfo } from "@/types/main-page";

import { useUserStore } from "@/store/userStore";
import { useSnowStore } from "@/store/snowStore";

import { Button } from "@/components/ui/button";
import { ShareDialog } from "@/components/share/ShareDialog";
import { DialogProvider } from "@/contexts/DialogContext";
import WithoutAnswer from "./components/WithoutAnswer";
import WithAnswer from "./components/WithAnswer";

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
          history.replace("/question-create");
          return;
        }
        setColorCodeList(data.colorCodeList);
        setMainPageInfo(data);
      });
    }
  }, [userInfo, history]);

  const hasUserId = userInfo?.id != null;

  return (
    <>
      {!hasUserId ? (
        <Redirect to="/member-login" />
      ) : !mainPageInfo ? (
        <div className="text-white h-screen flex flex-col justify-center items-center">
          <p className="mb-4 text-h5">질문을 아직 만들지 않았어요!</p>
          <Button onClick={() => history.replace("/question-create")}>
            질문 만들러가기
          </Button>
        </div>
      ) : (
        <DialogProvider>
          <section className="flex flex-col justify-center items-center h-screen">
            <h2 className="font-bold text-h2 mb-2 text-white">
              {mainPageInfo.nickname}님의 보따리에
            </h2>
            {mainPageInfo.totalCount < 1 ? (
              <WithoutAnswer
                userId={userInfo.id}
                questionContent={mainPageInfo.content}
              />
            ) : (
              <WithAnswer userId={userInfo.id} mainPageInfo={mainPageInfo} />
            )}
          </section>
          <ShareDialog userId={userInfo.id} />
        </DialogProvider>
      )}
    </>
  );
}
