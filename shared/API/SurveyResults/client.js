import 'babel/polyfill';
import 'whatwg-fetch';

import cookie from 'react-cookie';

const endpoint = '/api/surveys';

export default {
  async getSurveys() {
    try {
      let bearer = cookie.load('jwt');
      let res = await fetch(`${endpoint}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        }
      });

      let surveys = await res.json();
      return surveys;
    } catch (err) {
      throw new Error(err);
    }
  }
}
