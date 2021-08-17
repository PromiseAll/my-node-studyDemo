import https from "https";
import fs from "fs";
import Koa from "koa";
import Body from "koa-body";


const app = new Koa();
app.use(Body());
app.use((ctx, next) => {
  console.log(ctx.request);
  ctx.body = 'ctx.request.Body';
  next();
});

const options = {
  key: fs.readFileSync("./cert/server.key"),
  cert: fs.readFileSync("./cert/server.crt"),
};
const port = 3000;

https.createServer(options, app.callback()).listen(port, () => {
  console.log(`running server https://127.0.0.1`);
});
