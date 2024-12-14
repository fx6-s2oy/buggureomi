import { Button } from "@/components/ui/button";
import { useSelfReflection } from "@/hooks/useSelfReflection";
import { useHistory } from "react-router-dom";

type ReflectionButtonProps = {
  userId: number;
};

export function ReflectionButton({ userId }: ReflectionButtonProps) {
  const history = useHistory();
  const { hasReflection, isLoading } = useSelfReflection(userId);

  if (isLoading) return null;

  return (
    <Button onClick={() => history.push("/self-reflection")}>
      {hasReflection ? "내가 생각한 나" : "나 돌아보기"}
    </Button>
  );
}
