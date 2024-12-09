import { MEMBER_ID_KEY } from "@/constant/keys";
import React from "react";
import { Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated: boolean = !!localStorage.getItem(MEMBER_ID_KEY);

  if (isAuthenticated) {
    return children;
  }

  return <Redirect to="/member-login" />;
}
