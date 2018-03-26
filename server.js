const Koa = require("koa");
const koaBody = require("koa-body");
const router = require("./app/routes");
const app = new Koa();
require('dotenv').config();

app.use(koaBody());
router(app);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || err.code;
    ctx.body = {
      success: false,
      message: err.message
    };
  }
});

app.listen(process.env.APP_PORT || 3000);
