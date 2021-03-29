const koa = require("koa");
const sha1 = require("sha1");
const app = new koa();
const { getUserDataAsync, formatMessage, parseXMLAsync } = require("./util/xml");

const config = {
  token: "promise",
  appID: "wx2f24e4602a78a93a",
  appsecret: "3ee1130b55309922ea5599444eadd7ed",
};

app.use(async (ctx) => {
  if (ctx.method == "POST") {
    // console.log(ctx.req);
    const xmlData = await getUserDataAsync(ctx.req);
    console.log(xmlData);
    const jsData = await parseXMLAsync(xmlData);
    const message = formatMessage(jsData);
    const resMessage = `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${new Date().toLocaleString() + message.PicUrl}]]></Content>
    </xml>`;
    ctx.body = resMessage;
    return;
  }

  const { signature, echostr, timestamp, nonce } = ctx.request.query;
  const { token } = config;
  const arr = [timestamp, nonce, token];
  const arrSort = arr.sort(); //字典序排序
  console.log(arrSort);
  // 拼接成字符串  并进行sha1 加密
  const str = arr.join("");
  const shaStr = sha1(str);
  console.log(shaStr);
  // 微信发过来的  与 自己生成的进行对比 相等则来源于微信服务器
  if (shaStr === signature) {
    ctx.body = echostr;
  } else {
    ctx.body = "error";
  }
});
app.listen(8088);
