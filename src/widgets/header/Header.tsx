import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SettingsSheet from "@/features/settings/SettingsSheet";
import BackHeader from "@/components/back-header/BackHeader";

export default function Header() {
  const history = useHistory();
  const [isMainPage, setIsMainPage] = useState(
    history.location.pathname === "/main"
  );

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setIsMainPage(location.pathname === "/main");
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <div className="flex items-center justify-between pt-4">
      <BackHeader />
      {isMainPage && <SettingsSheet />}
    </div>
  );
}
