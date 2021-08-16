import Koa from "koa";
import Router from "koa-router";
import Body from "koa-body";
import db from "./db/index.mjs";
import sportRouter from "./routers/sport.mjs";

// 初始化数据库
db.init();


// 新建一个应用
const app = new Koa();
// 解析body
app.use(Body());
// 配置路由
const router = new Router();
router.use(sportRouter.routes());
app.use(router.routes());

// 启动监听端口
app.listen(4000, "0.0.0.0", (err) => {
  console.log(4000);
});
