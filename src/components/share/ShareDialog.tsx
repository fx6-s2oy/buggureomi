import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import CopyURLButton from "./CopyURLButton";
import { MessageCircle, QrCode } from "lucide-react";
import { useDialog } from "@/contexts/DialogContext";
import { useEffect, useState } from "react";
import { ShareInfo } from "@/types/link";
import { getLink } from "@/api/link";
import { SHARE_LINK_PARAM } from "@/constant/link";

type Props = {
  userId: number;
};

export function ShareDialog({ userId }: Props) {
  const { open, onClose } = useDialog();
  const [shareInfo, setShareInfo] = useState<ShareInfo>();

  useEffect(() => {
    getLink(userId, SHARE_LINK_PARAM).then((res) => {
      setShareInfo(res.data);
    });
  }, [userId]);

  return (
    <>
      {shareInfo && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent>
            <DialogDescription>
              <h2 className="text-h2 font-medium text-gray-900">
                친구에게
                <span className="font-bold"> 공유</span>
                해
                <br />
                구슬을 얻어볼까요?
              </h2>
            </DialogDescription>
            <DialogFooter>
              <Button
                className="bg-[#FEE500] text-[#3C1E1E]"
                onClick={() => {
                  window.Kakao.Share.sendScrap({
                    requestUrl: shareInfo.url,
                  });
                }}
              >
                <MessageCircle fill="#3C1E1E" size={48} />
                카카오톡으로 공유하기
              </Button>
              <Button variant="default" className="w-full">
                <QrCode />
                QR코드 공유하기
              </Button>
              <CopyURLButton url={shareInfo.url} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
