import 'babel/polyfill';
import 'whatwg-fetch';


export default {
  
  async signup(userInfo) {
    try {
      let res = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      let user = await res.json();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },

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

      let user = await res.json();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
