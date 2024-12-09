import { Button } from "../ui/button";
import { useHistory } from "react-router-dom";

export function DirectLogin() {
  const history = useHistory();

  // TODO: memberId 사용 예정
  //   const memberId = url.split("/").pop
  const DUMMY_MEMBER_ID = 2;

  return (
    <div>
      로그인 후 이용해주세요. <br />
      <Button
        onClick={() =>
          history.push({
            pathname: "/member-login",
            state: { memberId: DUMMY_MEMBER_ID },
          })
        }
      >
        로그인
      </Button>
    </div>
  );
}
