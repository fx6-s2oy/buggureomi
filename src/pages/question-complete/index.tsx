import { Button } from "@/components/ui/button";
import { useHistory } from "react-router-dom";
import mascot_back from "@/shared/assets/mascot/mascot-back-standing.svg";
import ShareButton from "@/components/share/ShareButton";
import { ShareDialog } from "@/components/share/ShareDialog";
import { DirectLogin } from "@/components/display/DirectLogin";
import { useUserStore } from "@/store/userStore";
import { DialogProvider } from "@/contexts/DialogContext";

export default function QuestionComplete() {
  const { userInfo } = useUserStore();

  const history = useHistory();

  if (!userInfo?.id) {
    return <DirectLogin />;
  }

  return (
    <section className="flex flex-col items-center gap-4 justify-between h-full">
      <div className="flex flex-col items-center my-auto">
        <p className="text-center text-white text-2xl">
          <b>보따리가 완성되었어요!</b>
          <br />
          질문을 공유해볼까요?
        </p>

        <img src={mascot_back} className="w-36 h-64" alt="bundle" />
      </div>
      <div className="flex flex-col gap-4 w-full py-10">
        <Button
          className="w-full"
          onClick={() => {
            history.push("/main");
          }}
          children={"완료"}
        />
        <DialogProvider>
          <ShareButton
            icon={{ style: { color: "#667EF5" } }}
            className="flex gap-1 bg-white text-[#667EF5]"
            children="링크 공유하기"
          />
          <ShareDialog userId={userInfo.id} />
        </DialogProvider>
      </div>
    </section>
  );
}
