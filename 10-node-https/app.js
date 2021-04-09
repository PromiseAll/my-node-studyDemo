const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./cert/server.key"),
  cert: fs.readFileSync("./cert/server.crt"),
  // （双向认证）添加可信任的CA证书，用于验证客户端证书
  ca: fs.readFileSync("./cert/root.crt"),
  // passphrase: "146116", 如果证书需要密码则使用密码

  // 使用客户端证书验证
  requestCert: true,
  // 如果没有请求到客户端来自信任CA颁发的证书，拒绝客户端的连接
  rejectUnauthorized: true,
};
const port = 443;
https
  .createServer(options, (req, res) => {
    console.log("server connected", res.connection.authorized ? "authorized" : "unauthorized");
    res.writeHead(200);
    res.end("hello world!\n");
  })
  .listen(port, () => {
    console.log(`running server https://127.0.0.1`);
  });

// 使用客户端连接测试
require("./client");
