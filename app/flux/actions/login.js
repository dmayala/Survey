import cookie from 'react-cookie';
const APIUtils = require(`../../../shared/API/Login/${ process.env.BROWSER ? 'client' : 'server' }`)

class LoginActions { 

  constructor() {
    this.generateActions(
      'loginUserSuccess',
      'loginUserFail',
      'logoutUserSuccess',
      'logoutUserFail',
      'loginGuestSuccess',
      'loginGuestFail'
    );
  }

  loadUser(jwt) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        this.actions.loginUserSuccess(jwt);
      });
  }

  logoutUser() {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          if (cookie.load('jwt')) {
            cookie.remove('jwt');
            this.actions.logoutUserSuccess();
          }
        } catch (error) {
          this.actions.logoutUserFail({ error });
        }
      });
  }

  loginUser(details) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.login(details);
          cookie.save('jwt', response.token);
          this.actions.loginUserSuccess(response);
        } catch (error) {
          this.actions.loginUserFail({ error });
        }
      });
  }

  loadGuest(jwt) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        this.actions.loginGuestSuccess(jwt);
      });
  }

  getGuest() {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.getGuest();
          cookie.save('guest', response.token);
          this.actions.loginGuestSuccess(response);
        } catch (error) {
          this.actions.loginGuestFail({ error });
        }
      });
  }
}

export default LoginActions; 
