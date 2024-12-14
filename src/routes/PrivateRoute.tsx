import React from "react";
import { Redirect, RouteProps } from "react-router-dom";

import { useUserStore } from "@/store/userStore";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { userId } = useUserStore();
  const isAuthenticated: boolean = !!userId;

  if (isAuthenticated) {
    return children;
  }

  return <Redirect to="/member-login" />;
}
