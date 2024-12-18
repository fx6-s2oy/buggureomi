import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { memberAPI } from "@/api/member";
import { MemberJoinParam } from "@/api/member/type";
import { memberJoin, MemberJoinFormType } from "./schema/memberJoinSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function MemberJoin() {
  const history = useHistory();

  const form = useForm<MemberJoinFormType>({
    resolver: zodResolver(memberJoin),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      terms1: false,
      terms2: false,
    },
  });
  const watchTerms = form.watch(["terms1", "terms2"]);

  const handleAgreeAllChange = (checked: boolean) => {
    form.setValue("terms1", checked);
    form.setValue("terms2", checked);
  };

  function onSubmit(values: MemberJoinFormType) {
    const joinParams: MemberJoinParam = {
      nickname: values.nickname,
      email: values.email as `${string}@${string}`,
      password: values.password,
    };
    memberAPI.join(joinParams).then((res) => {
      const data = res.data;

      if (data.status === "OK") {
        history.push("/member-login");
      }
    });
  }

  return (
    <div className="text-white">
      <div className="text-center pt-20 pb-10 mb-3">
        <h3 className="text-h3">
          내 스스로 난 <span className="text-primary">어떤 사람</span>이었는지
        </h3>
        <h3 className="text-h3">정의할 수 있는 닉네임을 만들어 보아요!</h3>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    {...field}
                  />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t border-gray-300 pt-4">
            <div className="flex items-center mb-4">
              <Checkbox
                id="termsAgreeAll"
                checked={watchTerms.every(Boolean)}
                onCheckedChange={(checked) =>
                  handleAgreeAllChange(checked as boolean)
                }
              />
              <label htmlFor="termsAgreeAll" className="ml-2 text-sm">
                전체동의
              </label>
            </div>
            <FormField
              control={form.control}
              name="terms1"
              render={({ field }) => (
                <FormItem className="flex gap-3 space-y-0 mb-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0 leading-none">
                    <FormLabel>약관1에 동의합니다.</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms2"
              render={({ field }) => (
                <FormItem className="flex gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0 leading-none">
                    <FormLabel>약관2에 동의합니다.</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">회원가입</Button>
        </form>
      </Form>
    </div>
  );
}
