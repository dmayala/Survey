import 'babel/polyfill';
import 'whatwg-fetch';

import cookie from 'react-cookie';

const endpoint = '/api/surveys';

export default {
  async getRandom() {
    try {
      let bearer = cookie.load('guest');
      let res = await fetch(`${endpoint}/rand`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        }
      });

      let survey = await res.json();
      return survey;
    } catch (err) {
      throw new Error(err);
    }
  },

  async vote(surveyId, choiceId) {
    try {
      let res = await fetch(`/api/surveys/${surveyId}/votes/${choiceId}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guest: cookie.load('guest') 
        })
      });
      let vote = await res.json();
      return vote;
    } catch (err) {
      throw new Error(err);
    }
  }
}
