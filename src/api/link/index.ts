import * as T from "./type";
import { api } from "..";

export async function getLink(
  questionId: string,
  memberId: string,
  params: T.ShareLinkParam
): Promise<T.ShareLinkResponse> {
  const res = await api.get(`/question/${questionId}/share-info/${memberId}`, {
    params,
  });
  return res.data;
}
