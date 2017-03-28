const User = require('../models/user');

class UserService {
  create(data, params, next) {
    return User.create(data)
      .then(user => Promise.resolve(user))
      .catch(next);
  }
  remove(_id, params, next) {
    return User.findByIdAndRemove({ _id })
      .then(user => Promise.resolve(user))
      .catch(next);
  }
  update(_id, data, params, next) {
    return User.findByIdAndUpdate({ _id }, data, { new: true })
      .then(user => Promise.resolve(user))
      .catch(next);
  }
}

module.exports = UserService;
