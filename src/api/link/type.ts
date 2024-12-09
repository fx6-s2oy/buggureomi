export type ShareLinkParam = {
  pageUrl: string;
  width: number;
  height: number;
};

export type ShareLinkResponse = {
  status: "OK" | "BAD_REQUEST";
  message: string;
  data: {
    url: string;
    qrCode: string;
  };
};
