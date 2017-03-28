const feathers = require('feathers');
const rest = require('feathers-rest');
const router = feathers();

const LoginService = require('../services/login_service');
const UserService = require('../services/user_service');
const BucketService = require('../services/bucket_service');

// Enable REST services
router.configure(rest());

router.use('/login', new LoginService());
router.use('/user', new UserService());
router.use('/bucket', new BucketService());

module.exports = router;
