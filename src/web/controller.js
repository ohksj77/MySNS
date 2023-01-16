exports.home = (ctx, next) => {
    console.log("홈페이지 호출");
    ctx.body = "홈페이지";
}

exports.page = async (ctx, next) => {
    let page = ctx.params.page;
    let pagename = "";
    switch (page) {
        case 'terms':
            pagename = "이용약관";
            break;
        case 'policy':
            pagename = "개인정보 처리방침";
            break;
        default:
            pagename = "기본";
            break;
    }

    await ctx.render('index', { pagename });
}