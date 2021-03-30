"use strict";
try {
  var { createClient } = require("../client");
} catch {
  var { createClient } = require("oicq");
}
const { segment, cqcode } = require("oicq");

// your account
const uin = 2238480780;
const bot = createClient(uin, {
  log_level: "debug", //日志级别设置为debug
  platform: 2, //登录设备选择为手机
});

//监听并输入滑动验证码ticket(同一地点只需验证一次)
bot.on("system.login.slider", () => {
  process.stdin.once("data", (input) => {
    bot.sliderLogin(input);
  });
});

//监听设备锁验证(同一设备只需验证一次)
bot.on("system.login.device", () => {
  bot.logger.info("验证完成后敲击Enter继续..");
  process.stdin.once("data", () => {
    bot.login();
  });
});

const My = require("./data/text/my");
const my = new My(bot, 1310020799);
//监听私聊
bot.on("message.private.friend", (data) => {
  //   var message = [
  // segment.text("hello world"),
  // segment.image("C:/Users/Administrator/Pictures/nav.png"),
  // segment.face(104),
  // segment.location(1,102,'你心里')
  // segment.record("C:/Users/Administrator/Pictures/3.silk")
  //   ];
  //   console.log(data);
  if (data.user_id == 1310020799 && data.message[0].type == "text") {
    my.receive(data.message[0].data.text);
  }
  //   bot.sendPrivateMsg(2325612559, message);
});

bot.login("2238480780QQ"); // your password or password_md5

module.exports = bot;
