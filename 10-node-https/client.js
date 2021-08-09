const https = require("https");
const fs = require("fs");

var options = {
  host: "localhost",
  port: 443,
  path: "/",
  method: "GET",
  // （双向认证）请求使用客户端证书，使服务器信任请求
  key: fs.readFileSync("./cert/client.key"),
  cert: fs.readFileSync("./cert/client.crt"),

  // （单向认证）添加可信任根证书，验证服务端证书 验证是否可信任
  ca: [fs.readFileSync("./cert/root.crt")],

  rejectUnauthorized: true, // 如果验证失败，则断开请求
  agent: false, // 仅为此一个请求创建一个新代理
};
var req = https.request(options, function (res) {
  console.log("server authorize status: " + res.socket.authorized);
  res.on("data", function (d) {
    console.log("响应数据: " + d);
  });
});
req.end();
req.on("error", function (e) {
  console.error(e);
});
