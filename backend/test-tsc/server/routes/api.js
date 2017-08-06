const feathers = require('feathers');
const router = feathers();
const rest = require('feathers-rest');
const LoginService = require('../services/login_service');
const UserService = require('../services/user_service');
const BucketService = require('../services/bucket_service');
router.configure(rest());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.use('/login', new LoginService());
router.use('/user', new UserService());
router.use('/bucket', new BucketService());
module.exports = router;
//# sourceMappingURL=api.js.map