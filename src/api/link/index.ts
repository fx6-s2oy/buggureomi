import * as T from "./type";
import { api } from "..";

export async function getLink(
  memberId: string,
  params: T.ShareLinkParam
): Promise<T.ShareLinkResponse> {
  const res = await api.get(`/member/share-info/${memberId}`, {
    params,
  });
  return res.data;
}
