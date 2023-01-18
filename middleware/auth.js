const jwt = require("jsonwebtoken");

exports.verify = async (ctx, next) => {
    let token = ctx.request.headers['token'];
    await jwt.verify(token, process.env.APP_KEY, async (error, decoded) => {
        if (error) {
            ctx.body = "로그인을 해야합니다.";
            return;
        }
        await next();
    })
}