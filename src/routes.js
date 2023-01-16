const Router = require('@koa/router');
const router = new Router();

const { myLogging } = require('../middleware/logging')
const { verify } = require('../middleware/auth')

const webController = require('./web/controller');
const userApiController = require('./api/user/controller');
const feedApiController = require('./api/feed/controller');

router.use(myLogging);

router.get('/', webController.home);
router.get('/page/:page', webController.page);

router.post('/api/user/register', userApiController.register);
router.post('/api/user/login', userApiController.login);

router.use(verify);
router.get('/api/user/:id', userApiController.info);

router.get('/api/feed', feedApiController.index);
router.post('/api/feed', feedApiController.store);
router.get('/api/feed/:id', feedApiController.show);
router.get('/api/feed/:id', feedApiController.update);
router.get('/api/feed/:id', feedApiController.delete);

module.exports = router;
