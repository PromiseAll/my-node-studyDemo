import Router from "koa-router";
import start from "../tools/sport.mjs";

const router = new Router({ prefix: "/sport" });




// 验证中间键
// router.use(async (ctx, next) => {
//   let checkHostList = ["127.0.0.1"];
//   if (checkHostList.some((v) => v == ctx.request.header["referer"])) {
//     await next();
//   } else {
//     ctx.body = {
//       code: 3,
//       message: "未授权",
//     };
//   }
// });

/**
 * @description: 提交数据
 */
router.post("/start", async (ctx, next) => {
  const { phone, password, step } = ctx.request.body;
  ctx.body = await start(phone, password, step);
  next();
});

router.get("/", (ctx) => {
  // 获取远程ip地址
  ctx.body = ctx.req.socket.remoteAddress;
});

export default router;
