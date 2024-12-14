import { useEffect, useState } from "react";
import { answerAPI } from "@/api/answer";
import { SelfReflection } from "@/types/self-reflection";
import { useToast } from "@/hooks/use-toast";

export function useSelfReflection(userId: number) {
  const [selfReflection, setSelfReflection] = useState<SelfReflection>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSelfReflection = async () => {
      try {
        const response = await answerAPI.getSelfReflectionAnswer(userId);
        setSelfReflection(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "회고 불러오기 실패",
          description: "회고를 불러오는데 실패했습니다.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelfReflection();
  }, [userId, toast]);

  return {
    selfReflection,
    hasReflection: selfReflection.length > 0,
    isLoading,
  };
}
