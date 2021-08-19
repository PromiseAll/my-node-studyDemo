// import { WebSocketServer } from "ws";
// import { createServer } from "http";

const { WebSocketServer } = require("ws");
const { createServer } = require("http");

let server = createServer();
const websocket = new WebSocketServer({ noServer: true });
server.on("request", (request, res) => {
  console.log("request");
  res.end("request");
});

websocket.on("connection", (ws, request, client) => {
  console.log("ws连接");
  ws.ping("noop");
  ws.on("message", function mew(msg) {
    console.log(`Received message ${msg} from user ${client}`);
    this.send(`Received message ${msg} from user ${client}`);
  });
});

server.on("upgrade", (request, socket, head) => {
  console.log("upgrade");
  websocket.handleUpgrade(request, socket, head, function done(ws) {
    websocket.emit("connection", ws, request, head);
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("服务器启动");
});
