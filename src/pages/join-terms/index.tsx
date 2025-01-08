import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { memberAPI } from "@/api/member";
import { TermsAgreeParam } from "@/api/member/type";

import { useUserStore } from "@/store/userStore";
import { termsSchema, TermsAgreementType } from "./schema/termsSchema";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import TermsOfService from "./terms/TermsOfService";
import RejectDialog from "@/components/agree-terms/RejectDialog";

export default function JoinTerms() {
  const history = useHistory();

  const { userInfo, updateUserInfo } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TermsAgreementType>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      agreeTerms: false,
    },
  });

  const onSubmit = (values: TermsAgreementType) => {
    const param: TermsAgreeParam = {
      isTermsAgreed: values.agreeTerms ? 1 : 0,
    };

    try {
      if (param.isTermsAgreed) {
        memberAPI.termsAgree(param).then((res) => {
          const data = res.data;

          if (data.status === "OK") {
            updateUserInfo({ isTermsAgreed: 1 });
          }
        });
      }
    } finally {
      const redirectPath = localStorage.getItem("redirectPath") || "/main";
      history.push(redirectPath);
      localStorage.removeItem("redirectPath");
    }
  };

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  if (userInfo?.isTermsAgreed) {
    return <Redirect to="/main" />;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <div className="text-center pt-4 pb-5 text-white">
            <h2 className="text-h2">회원 가입 약관 동의</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-340px)] rounded-lg">
            <TermsOfService />
          </ScrollArea>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <>
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-none text-lg text-white">
                      약관을 모두 확인하였습니다.
                    </FormLabel>
                  </FormItem>
                  <FormMessage className="text-center" />
                </>
              )}
            />

            <div className="flex justify-center gap-4 mt-5">
              <Button type="submit" size="lg">
                동의
              </Button>
              <Button
                type="button"
                onClick={toggleDialog}
                variant="secondary"
                size="lg"
              >
                거부
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <RejectDialog isOpen={isOpen} onClose={toggleDialog} />
    </>
  );
}
