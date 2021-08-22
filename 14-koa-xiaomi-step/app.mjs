/*
 * @Author: your name
 * @Date: 2021-08-16 22:33:47
 * @LastEditTime: 2021-08-21 22:25:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-node-studyDemo\14-koa-xiaomi-step\app.mjs
 */
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
