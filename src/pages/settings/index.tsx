import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MemberSettings } from "@/types/member";
import { userInfo } from "@/api/settings";

export default function Settings() {
  const memberId = "9"; // 임시 memberId
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
      await userInfo.updateSettings(memberId, newSettings);
      setSettings(newSettings);
    } catch (error) {
      setSettings(settings);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await userInfo.getSettings(memberId);
      const { isPublicVisible, isCountVisible, isAuthRequired } =
        response.data.data;
      setSettings({ isPublicVisible, isCountVisible, isAuthRequired });
    } catch (error) {
      console.error("설정을 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [memberId]);

  return (
    <div>
      <h2 className="text-h2 text-gray-dark">설정</h2>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="login-required"
              className="text-h6 text-gray-dark flex-1"
            >
              회원만 대답을 넣을 수 있게 할까요?
            </Label>
            <Switch
              id="login-required"
              checked={settings.isPublicVisible === 1}
              onCheckedChange={() => handleUpdateSetting("isPublicVisible")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="pouch-visible"
              className="text-h2 text-gray-dark flex-1"
            >
              다른 사람도 내 보따리를 열어볼 수 있게 할까요?
            </Label>
            <Switch
              id="pouch-visible"
              checked={settings.isCountVisible === 1}
              onCheckedChange={() => handleUpdateSetting("isCountVisible")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="marble-count"
              className="text-h6 text-gray-dark flex-1"
            >
              내 보따리에 담긴 답변 갯수가 보이게 할까요?
            </Label>
            <Switch
              id="marble-count"
              checked={settings.isAuthRequired === 1}
              onCheckedChange={() => handleUpdateSetting("isAuthRequired")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
