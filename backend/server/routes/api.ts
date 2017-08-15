import * as feathers from 'feathers';
import * as rest from 'feathers-rest';

import LoginService from '../services/login_service';
import UserService from '../services/user_service';
import BucketService from '../services/bucket_service';


const router = feathers();

router.configure(rest());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use('/login', <any>new LoginService());
router.use('/user', <any>new UserService());
router.use('/bucket', <any>new BucketService());

export default router;
