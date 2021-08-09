const nodemailer = require("nodemailer");

async function main() {
  //   生成使用测试邮箱
  //   let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "2238480780@qq.com", // generated ethereal user
      pass: "mraisclnkgumeabb", // 授权码
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "zeng.guangwu@qq.com", // sender address
    to: "2325612559@qq.com", // list of receivers
    subject: "验证码", // Subject line
    text: Math.random() + "", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main();
