import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";

import { userAPI } from "@/api/settings";
import { MemberSettings } from "@/types/member";

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

import { useUserStore } from "@/store/userStore";

export default function SettingsSheet() {
  const { userInfo } = useUserStore();
  const [open, setOpen] = useState(false);

  const [settings, setSettings] = useState<MemberSettings>({
    isPublicVisible: 0,
    isCountVisible: 0,
    isAuthRequired: 0,
  });

  const handleUpdateSetting = async (key: keyof MemberSettings) => {
    const newSettings = {
      ...settings,
      [key]: settings[key] === 1 ? 0 : 1,
    };

    try {
      if (userInfo?.id) await userAPI.updateSettings(userInfo.id, newSettings);
      setSettings(newSettings);
    } catch (error) {
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
      } catch (error) {
        console.error("설정을 불러오는데 실패했습니다.");
      }
    };
    fetchSettings();
  }, [userInfo]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <Label htmlFor="marble-count" className="text-body font-semibold">
              구슬(답변) 개수 공개
            </Label>
            <Switch
              id="marble-count"
              checked={settings.isAuthRequired === 1}
              onCheckedChange={() => handleUpdateSetting("isAuthRequired")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="login-required" className="text-body font-semibold">
              로그인한 유저만 답변 가능
            </Label>
            <Switch
              id="login-required"
              checked={settings.isPublicVisible === 1}
              onCheckedChange={() => handleUpdateSetting("isPublicVisible")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pouch-visible" className="text-body font-semibold">
              다른 유저 조회 가능
            </Label>
            <Switch
              id="pouch-visible"
              checked={settings.isCountVisible === 1}
              onCheckedChange={() => handleUpdateSetting("isCountVisible")}
            />
          </div>
        </div>
        <SheetFooter className="mt-auto !flex-col gap-8">
          <LogoutButton className="mx-auto" />

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            닫기
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
