import React from "react";
import { Redirect, RouteProps } from "react-router-dom";

import { useLoginCheck } from "@/hooks/useLoginCheck";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogin } = useLoginCheck();

  if (isLogin) {
    return children;
  }

  return <Redirect to="/member-login" />;
}
