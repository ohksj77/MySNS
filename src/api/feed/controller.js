exports.index = (ctx, next) => {
    let query = ctx.query;
    console.log(`새로운 글인가요? ${isNewFeed('2023-01-12 15:17:30')}`)
    ctx.body = query;
};

exports.store = (ctx, next) => {
    let body = ctx.request.body;
    ctx.body = body;
};

exports.show = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 피드 상세`;
};

exports.update = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 피드 수정`;
};

exports.delete = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 피드 삭제`;
};

const { isNewFeed } = require('../../common/formatter/date');
