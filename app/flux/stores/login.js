import jwt_decode from 'jwt-decode';

class LoginStore {
  constructor() {
    this.bindActions(this.alt.getActions('login'));
    this._user = null;
    this._jwt = null;
  }

  onLoginUserSuccess(jwt) {
    this._jwt = jwt.token;
    this._user = jwt_decode(this._jwt).user;
    if (process.env.BROWSER) {
      const history = require('utils/routerHistory');
      const [ , nextPath = '/account' ] = window
        .location.search.match(/\?redirect=(.+)$/) || [];
      return history.replaceState(null, nextPath);
    }
  }
}

export default LoginStore;
