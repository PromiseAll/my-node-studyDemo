const receiveVirtual = require("./my-robot");
class My {
  state = 1;
  name = "老公";
  age = 22;
  activateTheNumber = 0;
  robot = {};
  sendUser = '';
  constructor(robot, sendUser) {
    this.robot = robot;
    this.sendUser = sendUser;
  }
  activation(password) {
    if (password == "咪西咪西滑不拉几") {
      this.state = 1;
      this.robot.sendPrivateMsg(this.sendUser, "激活成功,你个大SB");
      this.receive("你好呀");
      return;
    } else {
    //   this.robot.sendPrivateMsg(this.sendUser, "密码错误,你个大笨蛋");
      return;
    }
  }
  sayHello() {
    this.robot.sendPrivateMsg(this.sendUser, text);
  }
  async receive(text) {
    if (this.state == 1) {
      if (text == "关机") {
        this.state = 0;
        this.robot.sendPrivateMsg(this.sendUser, "没爱了，你就这样抛弃我emmm,再见了");
        return;
      }
      let message = await receiveVirtual(text);
      this.robot.sendPrivateMsg(this.sendUser, message);
    } else if (this.state == 0) {
      this.activation(text);
    }
  }
}

module.exports = My;
