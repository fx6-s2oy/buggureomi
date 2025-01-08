import React from "react";
import { Redirect, RouteProps } from "react-router-dom";

import { useLoginCheck } from "@/hooks/useLoginCheck";
import { useUserStore } from "@/store/userStore";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogin } = useLoginCheck();
  const { userInfo } = useUserStore();

  if (!isLogin) {
    return <Redirect to="/member-login" />;
  } else {
    if (!userInfo?.isTermsAgreed) {
      return <Redirect to="/join/terms" />;
    } else {
      return children;
    }
  }
}
