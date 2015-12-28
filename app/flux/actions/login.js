import cookie from 'react-cookie';
const APIUtils = require(`../../../shared/API/Login/${ process.env.BROWSER ? 'client' : 'server' }`)

class LoginActions { 

  constructor() {
    this.generateActions(
      'loginUserSuccess',
      'loginUserFail'
    );
  }

  loadUser(jwt) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        this.actions.loginUserSuccess(jwt);
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

}

export default LoginActions; 
