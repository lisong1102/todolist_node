const jsonwebtoken = require('jsonwebtoken');
const SECRET = 'laotie666'; // 密钥

// 模拟登录得死数据
const USER = {
    username: 'zhangsan',
    password: '123456',
    id: 100
}
//添加数据
async function Login(ctx) {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        console.log(ctx.request.body, 'asss')
        // 登录
        // 判断用户名密码是否匹配
        let checkUser = ctx.request.body.name == USER.username && ctx.request.body.password == USER.password;
        if (checkUser) {
            ctx.body = {
                code: 200,
                msg: '登录成功',
                //payload中写入一些值  time:创建日期  timeout：多长时间后过期
                token: jsonwebtoken.sign(
                    { name: USER.username, id: USER.id, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 },  // 加密userToken
                    SECRET,
                    { expiresIn: '1h' }
                )
            }
        } else {
            // 登录失败, 用户名密码不正确
            ctx.body = {
                code: 400,
                msg: '用户名密码不匹配'
            }
        }
    }
}
module.exports = {
    Login
}
