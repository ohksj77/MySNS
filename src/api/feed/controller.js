const { create, show, update, deleteById, findAll } = require('./query');
const { isNewFeed } = require('../../common/formatter/date');

exports.index = async (ctx, next) => {
    let result = await findAll();
    if (result.length > 0) {
        ctx.body = result
    } else {
        ctx.body = {
            result: 'No Content'
        };
    }
};

exports.store = async (ctx, next) => {
    let body = ctx.request.body;
    let { affectedRows, insertId } = await create(body.user_id, body.image_id, body.content);
    if (affectedRows > 0) {
        ctx.body = {
            result: 'ok',
            id: insertId
        }
    } else {
        ctx.body = {
            result: 'fail',
        }
    }
};

exports.show = async (ctx, next) => {
    let id = ctx.params.id;
    let user = ctx.request.user;

    let result = await show(id);
    result['is_me'] = (user.id === result.user_id);
    if (result.length < 1) {
        ctx.body = { result: "fail" }
        return;
    }
    ctx.body = result;
};

exports.update = async (ctx, next) => {
    let id = ctx.params.id;
    let body = ctx.request.body;
    let { affectedRows, updateId } = await update(id, body.user_id, body.image_id, body.content);
    if (affectedRows > 0) {
        ctx.body = {
            result: 'ok',
            id: updateId
        }
    } else {
        ctx.body = {
            result: 'fail',
        }
    }
};

exports.delete = async (ctx, next) => {
    let id = ctx.params.id;
    let { affectedRows } = await deleteById(id);
    if (affectedRows > 0) {
        ctx.body = {
            result: 'ok'
        }
    } else {
        ctx.body = {
            result: 'fail',
        }
    }
};
