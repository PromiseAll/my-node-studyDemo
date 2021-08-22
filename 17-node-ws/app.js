const { createServer } = require("http");

let server = createServer();

server.on("request", (request, res) => {
  console.log("request");
  res.end("request");
});
server.on("upgrade", (request, socket, head) => {
  console.log("upgrade");
  console.log(socket.remoteAddress);
  console.log(head.toString());
  socket.end("5");
});
server.listen(3000, "127.0.0.1", () => {
  console.log("服务器启动");
});
