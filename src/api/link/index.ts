import * as T from "./type";
import { apiWithToken } from "..";

export async function getLink(
  userId: number,
  params: T.ShareLinkParam
): Promise<T.ShareLinkResponse> {
  const res = await apiWithToken.get(`/member/share-info/${userId}`, {
    params,
  });
  return res.data;
}
