import 'babel/polyfill';
import 'whatwg-fetch';

import cookie from 'react-cookie';

export default {
  
  async addSurvey(details) {
    try {
      let bearer = cookie.load('jwt');
      let res = await fetch('/api/surveys', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(details)
      });

      let survey = await res.json();
      return survey;
    } catch (err) {
      throw new Error(err);
    }
  }
}
