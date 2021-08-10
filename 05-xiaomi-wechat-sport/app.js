const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const sport = require("./sport");
const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(static(path.join(__dirname, "./static")));

const wechatSport = new Router();
wechatSport.post("/submit", async (ctx) => {
  try {
    await sport.main(ctx.request.body);
    ctx.body = {
      success: true,
      message: "更改步数成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      message: "更改失败,请检查账号密码是否正确",
    };
  }
});

const router = new Router();
router.use("/wechatSport", wechatSport.routes());

app.use(router.routes());

app.listen(3000);
