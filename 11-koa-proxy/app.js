// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
const proxy = require("koa2-proxy-middleware"); //引入代理模块
const bodyparser = require("koa-bodyparser");
var cors = require("koa2-cors");
const app = new Koa();

/* 代理配置 start */
const options = {
  targets: {
    "/(.*)": {
      target: "https://www.eyeit.cn", // target host
      changeOrigin: true, // needed for virtual hosted sites
    },
  },
};

app.use((ctx, next) => {
  ctx.req.headers["referer"] = "https://www.eyeit.cn/";
  next();
});


app.use(proxy(options));
app.use(
  cors({
    origin: "*",
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
  })
);

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);

app.listen(1001);
console.log("app started at port 1001...");
