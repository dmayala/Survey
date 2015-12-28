import 'babel/polyfill';
import 'whatwg-fetch';

export default {
  async login(userInfo) {
    try {
      let res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      let jwt = await res.json();
      return jwt;
    } catch (err) {
      throw new Error(err);
    }
  }
}
