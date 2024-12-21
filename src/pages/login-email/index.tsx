import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { memberAPI } from "@/api/member";
import { MemberLoginParam } from "@/api/member/type";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function MemberLogin() {
  const { state } = useLocation<{ userId: number; questionId: number }>();
  const [errorMessage, setErrorMessage] = useState<string>();

  console.log(state);
  const history = useHistory();

  const form = useForm<MemberLoginParam>({
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  function onSubmit(values: MemberLoginParam) {
    memberAPI.emailLogin(values).then((res) => {
      const data = res.data;

      if (data.status === "OK") {
        if (state?.userId && state?.questionId) {
          // COMMENT: 답변 작성 페이지에서 로그인 페이지로 유도한 경우 로그인 성공시 다시 답변 페이지로 redirection
          history.push({
            pathname: "/answer",
            search: `?userId=${state.userId}&questionId=${state.questionId}`,
          });
        } else {
          history.push("/main");
        }
        setErrorMessage("");
      } else {
        setErrorMessage(data.message);
      }
    });
  }

  function goToJoinPage() {
    history.push("/member-join");
  }

  return (
    <>
      <div className="text-center pt-20 pb-10 mb-3">
        <h2 className="text-h2 text-primary">로그인</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="닉네임을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    {...field}
                  />
                </FormControl>
                {errorMessage && (
                  <FormDescription>{errorMessage}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">로그인</Button>
        </form>
      </Form>

      <Button
        onClick={goToJoinPage}
        type="submit"
        variant="link"
        className="mx-auto block mt-4"
      >
        일반 회원가입
      </Button>
    </>
  );
}
