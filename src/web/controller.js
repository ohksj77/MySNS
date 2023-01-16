exports.home = (ctx, next) => {
    console.log("홈페이지 호출");
    ctx.body = "홈페이지";
}

exports.page = (ctx, next) => {
    let name = ctx.body.name;
    // let { name } = ctx.params; // 이거는 바로 위 코드와 같은 동작하는 코드

    ctx.body = name;
}