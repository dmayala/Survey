import 'babel/polyfill';
import 'whatwg-fetch';

const endpoint = '/api/surveys';

export default {
  async getSurveys() {
    try {
      let res = await fetch(`${endpoint}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let surveys = await res.json();
      return surveys;
    } catch (err) {
      throw new Error(err);
    }
  }
}
