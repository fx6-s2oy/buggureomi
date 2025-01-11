import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";

import { userAPI } from "@/api/settings";
import { MemberSettings } from "@/types/member";
import { FaPen } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import LogoutButton from "@/components/common/LogoutButton";
import CSCenterButton from "@/components/common/CSCenterButton";

import { useUserStore } from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SettingsSheetProps {
  showOnlyLogout?: boolean;
}

export default function SettingsSheet({
  showOnlyLogout = false,
}: SettingsSheetProps) {
  const { userInfo, setUserInfo } = useUserStore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState(userInfo?.nickname || "");

  const [settings, setSettings] = useState<MemberSettings>({
    isPublicVisible: 0,
    isCountVisible: 0,
    isAuthRequired: 0,
  });

  const handleUpdateNickname = async () => {
    try {
      await userAPI.updateNickname({ nickname: nickname });
      toast({
        description: "닉네임 수정에 성공했습니다.",
      });
      setIsEditMode(false);
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          nickname: nickname,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "닉네임 수정에 실패했습니다.",
        variant: "destructive",
      });
      setNickname(userInfo?.nickname || "");
    }
  };

  const handleUpdateSetting = async (key: keyof MemberSettings) => {
    const newSettings = {
      ...settings,
      [key]: settings[key] === 1 ? 0 : 1,
    };

    try {
      if (userInfo?.id) await userAPI.updateSettings(userInfo.id, newSettings);
      setSettings(newSettings);
    } catch {
      setSettings(settings);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        if (userInfo?.id) {
          const response = await userAPI.getSettings(userInfo.id);
          const { isPublicVisible, isCountVisible, isAuthRequired } =
            response.data.data;
          setSettings({ isPublicVisible, isCountVisible, isAuthRequired });
        }
      } catch {
        console.error("설정을 불러오는데 실패했습니다.");
      }
    };
    fetchSettings();
  }, [userInfo]);

  useEffect(() => {
    setNickname(userInfo?.nickname || "");
  }, [userInfo?.nickname]);

  const resetSheetState = () => {
    setIsEditMode(false);
    setNickname(userInfo?.nickname || "");
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      resetSheetState();
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetSheetState();
  };

  const handleNicknameButtonClick = () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    if (nickname !== userInfo?.nickname) {
      handleUpdateNickname();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button>
          <IoMdSettings size={32} color="#F0F0F0" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-[#373A4D] opacity-90 flex flex-col rounded-l-sheet p-10 border-none text-white">
        <SheetHeader className="pb-4">
          <div className="flex justify-center items-center gap-2">
            <IoMdSettings size={24} />
            <SheetTitle>
              <h2 className="text-h2 text-white flex items-center">설정</h2>
            </SheetTitle>
          </div>
        </SheetHeader>
        {!showOnlyLogout && (
          <div className="space-y-5">
            <div className="flex gap-2">
              <Input
                value={nickname}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setNickname(e.target.value);
                  }
                }}
                disabled={!isEditMode}
                className={cn(
                  "bg-[#2D3241] border-none disabled:opacity-100",
                  isEditMode ? "text-white" : "text-[#868686]"
                )}
                maxLength={10}
              />
              <button
                className={cn(
                  "bg-white p-3 rounded-xl",
                  (isEditMode && !nickname.trim()) ||
                    (isEditMode && nickname === userInfo?.nickname)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                )}
                onClick={handleNicknameButtonClick}
                disabled={
                  (isEditMode && nickname === userInfo?.nickname) ||
                  (isEditMode && !nickname.trim())
                }
              >
                {isEditMode ? (
                  <FaCheck size={16} color={"#667EF5"} />
                ) : (
                  <FaPen size={16} color="#323748" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marble-count" className="text-body font-semibold">
                구슬 개수 공개
              </Label>
              <Switch
                id="marble-count"
                checked={settings.isCountVisible === 1}
                onCheckedChange={() => handleUpdateSetting("isCountVisible")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="login-required"
                className="text-body font-semibold"
              >
                로그인한 유저만 답변 가능
              </Label>
              <Switch
                id="login-required"
                checked={settings.isAuthRequired === 1}
                onCheckedChange={() => handleUpdateSetting("isAuthRequired")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="pouch-visible"
                className="text-body font-semibold"
              >
                받은 구슬 공개
              </Label>
              <Switch
                id="pouch-visible"
                checked={settings.isPublicVisible === 1}
                onCheckedChange={() => handleUpdateSetting("isPublicVisible")}
              />
            </div>
          </div>
        )}
        <SheetFooter className="mt-auto !flex-col items-center">
          <LogoutButton className="mx-auto" />

          <Button
            variant="secondary"
            className="w-full mt-8 mb-3"
            onClick={handleClose}
          >
            닫기
          </Button>

          <CSCenterButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
