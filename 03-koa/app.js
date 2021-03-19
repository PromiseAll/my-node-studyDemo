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
let router = new Router();
router.use("/home", home.routes(), home.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  console.log(ctx.name);
  ctx.body = "hello koa2";
});

app.listen(3000);
