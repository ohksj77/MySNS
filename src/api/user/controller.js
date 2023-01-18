const { register, login, findById } = require('./query')
const jwt = require('jsonwebtoken');
const Promise = require('promise');
const crypto = require('crypto');

exports.info = async (ctx, next) => {
    let id = ctx.params.id;
    let result = await findById(id);
    if (result != null) {
        ctx.body = result;
    } else {
        ctx.body = {
            result: "fail"
        }
    }
}

exports.register = async (ctx, next) => {
    let { email, password, name } = ctx.request.body;
    let result = await crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512');

    let { affectedRows } = await register(email, result.toString('base64'), name);
    if (affectedRows > 0) {
        let token = await generateToken( {name});
        ctx.body = token;
    } else {
        ctx.body = {result: "fail"};
    }
}

exports.login = async (ctx, next) => {
    let { email, password } = ctx.request.body;
    let result = await crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512');
    let item = await login(email, result.toString('base64'));

    if (item == null) {
        ctx.body = { result: "fail" };
    } else {
        let token = await generateToken({name: item.name});
        ctx.body = token;
    }
}

let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.APP_KEY, (error, token) => {
            error ? reject(error) : resolve(token);
        })
    })
}