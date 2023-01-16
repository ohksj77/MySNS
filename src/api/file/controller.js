exports.upload = ctx => {
    let file = ctx.request.file;
    ctx.body = file;
}