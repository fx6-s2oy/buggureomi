import { Button } from "@/components/ui/button";
import { useSelfReflection } from "@/hooks/useSelfReflection";
import { useHistory } from "react-router-dom";

type ReflectionButtonProps = {
  memberId: string;
};

export function ReflectionButton({ memberId }: ReflectionButtonProps) {
  const history = useHistory();
  const { hasReflection, isLoading } = useSelfReflection(memberId);

  if (isLoading) return null;

  return (
    <Button onClick={() => history.push("/self-reflection")}>
      {hasReflection ? "내가 생각한 나" : "나 돌아보기"}
    </Button>
  );
}
