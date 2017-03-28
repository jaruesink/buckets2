const feathers = require('feathers');
const rest = require('feathers-rest');
const router = feathers();

const LoginService = require('../controllers/login_service');
const UserService = require('../controllers/user_service');
const BucketService = require('../controllers/bucket_service');

// Enable REST services
router.configure(rest());

router.use('/login', new LoginService());
router.use('/user', new UserService());
router.use('/bucket', new BucketService());

module.exports = router;
