const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const db = require("./db/connect");
let home = new Router();
let user = new Router();

home.get("/", async (ctx, next) => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = await db.query("SELECT * FROM user");
  //   next();
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
router.use("/home", home.routes(), home.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  console.log(ctx.name);
  ctx.body = "hello koa2";
});

app.listen(3000);
