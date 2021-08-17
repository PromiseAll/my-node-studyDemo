export const rule1 = {
  summary: "获取token,userid",
  *beforeSendRequest(requestDetail) {
    if (requestDetail.url.indexOf("https://prod.ggszhg.com/xgt-app-not-enter") == 0) {
      const url = new URLSearchParams(requestDetail.requestOptions.path);
      console.log(url);
      console.log(url.get("sign"));
    }
    return null;
  },
};
