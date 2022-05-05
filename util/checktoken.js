
const util = require('util');
const jsonwebtoken = require("jsonwebtoken");
const SECRET = 'laotie666'; // 密钥
async function check(ctx, next) {
    let url = ctx.request.url;
    // 登录 不用检查
    if (url == "/login") {
        await next();
    }
    else {
        let token = ctx.header['authorization'];
        console.log('token',ctx.header.authorization)
        if (token) {
            // // 解码
            let payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], SECRET);
            let { time, timeout } = payload;
            let data = new Date().getTime();
            if (data - time <= timeout) {
                // 未过期
                await next();
            } else {
                //过期
                ctx.body = {
                    status: 50014,
                    message: 'token 已过期'
                };
            }
        } else {
            ctx.body = {
                code: 4001,
                message: 'token 已过期'
            };
        }
        // 规定token写在header 的 'autohrization' 


    }
}

module.exports = check