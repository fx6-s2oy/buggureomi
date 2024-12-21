export type ShareLinkParam = {
  pageUrl: string;
};

export type ShareLinkResponse = {
  status: "OK" | "BAD_REQUEST";
  message: string;
  data: {
    url: string;
    qrCode: string;
  };
};
