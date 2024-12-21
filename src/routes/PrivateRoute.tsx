import React from "react";
import { Redirect, RouteProps } from "react-router-dom";

import { useUserStore } from "@/store/userStore";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { userInfo } = useUserStore();
  const isAuthenticated: boolean = !!userInfo?.id;

  if (isAuthenticated) {
    return children;
  }

  return <Redirect to="/member-login" />;
}
