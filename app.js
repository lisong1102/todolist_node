const koa = require('koa')
const app = new koa()
const router = require('./routes/index')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')
const path = require('path')
const checkToken =require('./util/checktoken')
app.use(cors())
app.use(koaStatic(path.join(__dirname, 'static', 'upload')))
//jwt验证
const koajwt = require('koa-jwt');
const SECRET = 'laotie666'; // 密钥

// 中间件对token进行验证
app.use(async (ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          msg: err.message
        }
      } else {
        throw err;
      }
    })
  });

app.use(koajwt({ secret: SECRET }).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [
        /^\/api\/login/,
        /^\/api\/register/,
        /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
}));

//jwt验证 end
app.use(checkToken)
app.use(bodyParser())
app.use(router.routes())
app.listen(3000, () => {
    console.log('3000端口已经启动')
})
