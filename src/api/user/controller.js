const { register } = require('./query')
const jwt = require('jsonwebtoken');
const Promise = require('promise');

exports.info = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 회원에 대한 정보`;
}

exports.register = async (ctx, next) => {
    let { email, password, name } = ctx.request.body;

    let { affectedRows } = await register(email, password, name);
    if (affectedRows > 0) {
        let token = await generateToken( {name});
        ctx.body = token;
    } else {
        ctx.body = {result: "fail"};
    }
}

exports.login = async (ctx, next) => {
    let { id, pw } = ctx.request.body;

    let result = '';

    if (id === 'admin' && pw === '1234') {
        result = await generateToken({name: 'abc'});
    } else {
        result = '아이디 혹은 패스워드가 올바르지 않습니다.';
    }

    ctx.body = result;
}

let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.APP_KEY, (error, token) => {
            error ? reject(error) : resolve(token);
        })
    })
}