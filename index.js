const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
//서버 실행 포트
const port = process.env.PORT || 3000;
// 바디파서
app.use(bodyParser({formLimit: '5mb'}));
// 라우터 설정
router.use(require('./src/routes').routes());
app.use(router.routes());
app.use(router.allowedMethods());
// 정적 파일
app.use(require('koa-static')(`${__dirname}/public`));
// 서버 실행
app.listen(port, () => {
    console.log(`웹서버 구동... ${port}`);
});