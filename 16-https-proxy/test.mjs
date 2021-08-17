import AnyProxy from "anyproxy";
import { rule1 } from "./rule.mjs";
const options = {
  port: 8001,
  rule: rule1,
  webInterface: {
    enable: true,
    webPort: 8002,
  },
  throttle: 10000,
  silent: false,
  forceProxyHttps: true,
  dangerouslyIgnoreUnauthorized: true,
  wsIntercept: false, // 不开启websocket代理
  silent: false,
};
const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on("ready", () => {});
proxyServer.on("error", () => {});
proxyServer.start();
