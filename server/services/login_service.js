const fetch = require('node-fetch');
const User = require('../models/user');
const user_service = require('./user_service');

const server_url = 'http://localhost:3000';
const fb_me_request = 'https://graph.facebook.com/v2.8/me?fields=id,name,email,picture';

function getUserFromFB(access_token) {
  return fetch(`${fb_me_request}&access_token=${access_token}`)
    .then(response => response.json);
}

class LoginService {
  get(access_token, params, next) {
    getUserFromFB(access_token).then((response) => {
      const { data: { id: fbid, name, email, picture: { data: { url: picture } } } } = response;
      const userProps = { fbid, name, email, picture };
      User.findOne({ fbid }).then((user) => {
        if (user) {
          const testProps = {
            fbid: user.fbid, name: user.name, email: user.email, picture: user.picture
          };
          if (JSON.stringify(testProps) === JSON.stringify(userProps)) {
            Promise.resolve(user);
          } else {
            user_service.update(user._id, userProps)
              .then(updated_user => Promise.resolve(updated_user));
          }
        } else {
          user_service.create(userProps)
            .then(created_user => Promise.resolve(created_user));
        }
      });
    }).catch(next);
  }
}

module.exports = LoginService;
