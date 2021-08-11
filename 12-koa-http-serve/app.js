const Koa = require("koa");
const Router = require("koa-router");
var cors = require("koa2-cors");

const app = new Koa();
let home = new Router();
let test = new Router();
let user = new Router();
const fs = require("fs");

app.use(
  cors({
    origin: "*",
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
  })
);





home.get("/", async (ctx, next) => {
  let html = `
  <iframe style="height:100%;width:100%;" src="/home/pdf"></iframe>
  `;
  ctx.body = html;

  //   ctx.res.setHeader("Content-Type", "application/pdf");
  //   ctx.res.setHeader("Content-Disposition", 'attachment;filename="1.pdf"');
  next();
});

home.get("/pdf", async (ctx, next) => {
  ctx.body = fs.readFileSync("C:/Users/Administrator/Downloads/木及简历.pdf");
  ctx.res.setHeader("Content-Type", "application/pdf"); 
  // ctx.res.setHeader("Content-Disposition", 'attachment;filename="1.pdf"');  //是否直接下载文件
  next();
});





test.all("/", async (ctx, next) => {

  let data = {
    name:888,
    host:9999
  }
  ctx.body ='23352525' ;
  ctx.status = 400
  ctx.body = JSON.stringify(data) ;

    ctx.res.setHeader("Content-Type", " */*");
  //   ctx.res.setHeader("Content-Disposition", 'attachment;filename="1.pdf"');
  next();
});








// 装载所有子路由
// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
// app.use(router.routes());
// app.use(router.allowedMethods({
//     // throw: true, // 抛出错误，代替设置响应头状态
//     // notImplemented: () => '不支持当前请求所需要的功能',
//     // methodNotAllowed: () => '不支持的请求方式'
// }));
let router = new Router();
router.use("/test", test.routes(), test.allowedMethods());

router.use("/home", home.routes(), home.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx) => {
//   ctx.body = "hello koa2";
// });

app.listen(2);
