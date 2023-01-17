const Router = require('@koa/router');
const router = new Router();
const multer = require('@koa/multer');
const path = require('path');
const upload = multer({
    dest: path.resolve(__dirname, '../', 'storage')
});

const { myLogging } = require('../middleware/logging')
const { verify } = require('../middleware/auth')

const webController = require('./web/controller');
const userApiController = require('./api/user/controller');
const feedApiController = require('./api/feed/controller');

router.use(myLogging);

router.post('/file/upload', upload.single('file'), require('./api/file/controller').upload);
router.get('/file/:id', require('./api/file/controller').download);

router.get('/', webController.home);
router.get('/page/:page', webController.page);

router.post('/api/user/register', userApiController.register);
router.post('/api/user/login', userApiController.login);

router.use(verify);
router.get('/api/user/:id', userApiController.info);

router.get('/api/feed', feedApiController.index);
router.post('/api/feed', feedApiController.store);
router.get('/api/feed/:id', feedApiController.show);
router.put('/api/feed/:id', feedApiController.update);
router.del('/api/feed/:id', feedApiController.delete);

module.exports = router;
