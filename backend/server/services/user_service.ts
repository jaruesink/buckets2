import logger from '../logger';
import { UserModel } from '../models/user';

export default class UserService {
  create(data, params?, errorCallback?) {
    const new_user = new UserModel(data);
    return new_user.save()
      .then(user => Promise.resolve(user))
      .catch(errorCallback);
  }
  remove(_id, params?, errorCallback?) {
    return UserModel.findByIdAndRemove({ _id })
      .then(user => Promise.resolve(user))
      .catch(errorCallback);
  }
  update(_id, data, params?, errorCallback?) {
    return UserModel.findByIdAndUpdate({ _id }, data, { new: true })
      .then(user => Promise.resolve(user))
      .catch(errorCallback);
  }
}