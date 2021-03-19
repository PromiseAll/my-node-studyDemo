const ws = require("nodejs-websocket");
const createServer = () => {
  let server = ws.createServer((connection) => {
    connection.id = connection.path.replace("/", "");
    connection.sendText("当前一共:" + server.connections.length + "人连接");
    connection.sendMessage = sendMessage;

    connection.on("text", function (result) {
      let data = JSON.parse(result);
      switch (data.type) {
        case 0:
          connection.sendPing("848");
          connection.sendText("已经接收消息");
          break;
        case 1:
          connection.sendMessage(data.userId, data.message);
          break;
        default:
          break;
      }
    });
    connection.on("connect", function (code) {
      console.log("开启连接", code);
    });
    connection.on("close", function (code) {
      console.log("关闭连接", code);
    });
    connection.on("error", function (code) {
      console.log("异常关闭", code);
    });
  });

  return server;
};

let server = createServer();

/**
 * @description: 给指定用户发送消息
 * @param {*} userId 指定用户id
 * @param {*} data  发生的消息
 */

function sendMessage(userId, data) {
  server.connections.map((receiveUser) => {
    if (receiveUser.id == userId) {
      receiveUser.sendText(
        JSON.stringify({
          sendUserId: this.id,
          data,
        })
      );
      return;
    }
  });
}

server.listen(3000);
