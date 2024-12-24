import { ShareInfo } from "@/types/link";

export type ShareLinkParam = {
  pageUrl: string;
};

export type ShareLinkResponse = {
  status: "OK" | "BAD_REQUEST";
  message: string;
  data: ShareInfo;
};
