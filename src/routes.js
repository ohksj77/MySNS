const Router = require('@koa/router');
const router = new Router();

const webController = require('./web/controller');
const userApiController = require('./api/user/controller');
const feedApiController = require('./api/feed/controller');

router.get('/', webController.home);
router.get('/page/:page', webController.page);

router.get('/api/user/:id', userApiController.info);

router.get('/api/feed', feedApiController.index);
router.post('/api/feed', feedApiController.store);
router.get('/api/feed/:id', feedApiController.show);
router.get('/api/feed/:id', feedApiController.update);
router.get('/api/feed/:id', feedApiController.delete);

module.exports = router;
