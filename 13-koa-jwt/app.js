const Koa = require("koa");
//生成token
const Jsonwebtoken = require("jsonwebtoken");
//验证token
const KoaJwt = require("koa-jwt");
const Router = require("koa-router");
const KoaBody = require("koa-body");

const app = new Koa();
// 模拟定义用户信息
const USER = {
  username: "zhangsan",
  password: "123456",
  id: 100,
};
// 定一个秘钥
const SECRET = "laotie666";

// 新建路由
const user = new Router();
const router = new Router();

// 登录
user.post("/login", (ctx, next) => {
  let checkUser = ctx.request.body.username == USER.username && ctx.request.body.password == USER.password;
  if (checkUser) {
    ctx.body = {
      code: 200,
      msg: "登录成功",
      token: Jsonwebtoken.sign(
        { name: USER.username, id: USER.id }, // 加密userToken
        SECRET,
        { expiresIn: "1s" }
      ),
    };
  } else {
    // 登录失败, 用户名密码不正确
    ctx.body = {
      code: 400,
      msg: "用户名密码不匹配",
    };
  }
});

// 获取用户信息
user.get("/getUser", async (ctx, next) => {
  // 1.通过state获取 解析token后的值
  console.log(ctx.state);
  // 2.自己获取
  let token = ctx.header.authorization;
  let payload = await Jsonwebtoken.verify(token.split(" ")[1], SECRET);
  console.log(payload);
  ctx.body = {
    code: 200,
    data: payload,
    msg: "请求成功",
  };
});

// 解析body
app.use(KoaBody());

// 处理token验证错误
app.use(async (ctx, next) => {
 await next().catch((err) => {
    ctx.body = {
      code: 400,
      data: "token验证失败",
    };
  });
});

// 对token进行验证
/*
secret:密钥,
key: 解密后的state key值，默认为user
*/

/*
iss (issuer)：jwt签发者
exp (expiration time)：jwt的过期时间，这个过期时间必须要大于签发时间
sub (subject)：jwt所面向的用户
aud (audience)：接收jwt的一方
nbf (Not Before)：定义在什么时间之前，该jwt都是不可用的
iat (Issued At)：jwt的签发时间
jti (JWT ID)：jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
*/
app.use(
  KoaJwt({ secret: SECRET, key: "jwtdata" }).unless({
    // 登录接口不需要验证
    path: [/^\/user\/login/],
  })
);

// 装载路由
router.use("/user", user.routes(), user.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, function () {
  console.log("listening 3000");
});
