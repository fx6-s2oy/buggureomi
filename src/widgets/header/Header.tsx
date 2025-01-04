import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useLoginCheck } from "@/hooks/useLoginCheck";

import BackButton from "@/components/header-button/BackButton";
import HomeButton from "@/components/header-button/HomeButton";
import SettingsSheet from "@/features/settings/SettingsSheet";

import MASCOT_ICON from "@/assets/image/main/mascot_icon.png";

export default function Header() {
  const location = useLocation();
  const { isLogin } = useLoginCheck();

  const [isShowBackButton, setIsShowBackButton] = useState(false);
  const [isShowHomeButton, setIsShowHomeButton] = useState(false);
  const [isShowSettingButton, setIsShowSettingButton] = useState(false);
  const [isShowOnlyLogout, setIsShowOnlyLogout] = useState(false);

  useEffect(() => {
    const isLoginPage = location.pathname === "/member-login";
    const isMainPage = location.pathname === "/main" && isLogin;
    const isAnswerIntro = location.pathname === "/answer";
    const isCreatedCompletePage =
      (location.pathname === "/question-create-complete" && isLogin) ||
      location.pathname === "/answer-create-complete";
    const isQuestionRoute = location.pathname.startsWith("/question");

    setIsShowBackButton(!isMainPage && !isLoginPage && !isAnswerIntro);
    setIsShowHomeButton(isCreatedCompletePage || isAnswerIntro);

    setIsShowSettingButton(isMainPage || isQuestionRoute);
    setIsShowOnlyLogout(isQuestionRoute);
  }, [location, isLogin]);

  return (
    <header className="flex items-center justify-between pt-4">
      {isShowBackButton ? (
        <BackButton />
      ) : isShowHomeButton ? (
        <HomeButton />
      ) : (
        location.pathname === "/main" && (
          <div className="w-12">
            <img src={MASCOT_ICON} alt="mascot" className="w-full" />
          </div>
        )
      )}
      {isShowSettingButton && (
        <SettingsSheet showOnlyLogout={isShowOnlyLogout} />
      )}
    </header>
  );
}
