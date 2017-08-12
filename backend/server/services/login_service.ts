import * as fetch from 'node-fetch';
import { UserModel, UserType } from '../models/user';
import UserService from './user_service';

const fb_me_request = 'https://graph.facebook.com/v2.8/me?fields=id,name,email,picture';

function getUserFromFB(access_token) {
  return fetch(`${fb_me_request}&access_token=${access_token}`)
    .then(response => response.json());
}

class LoginService {
  get(access_token, params, next) {
    return getUserFromFB(access_token).then(response => {
      const userFromFB = {
        fbid: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url 
      };
      return UserModel.findOne({ fbid: userFromFB.fbid }).then((found_user) => {
        const userProps = {
          fbid: found_user.id,
          name: found_user.name,
          email: found_user.email,
          picture: found_user.picture
        }
        if (found_user) {
          if (JSON.stringify(userFromFB) === JSON.stringify(userProps)) {
            return Promise.resolve(found_user);
          }
          return UserService.update(found_user._id, userProps).then(updated_user => Promise.resolve(updated_user));
        }
          return UserService.create(userProps).then(created_user => Promise.resolve(created_user));
      });
    }).catch(next);
  }
}

export default new LoginService();