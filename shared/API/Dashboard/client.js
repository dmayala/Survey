import 'babel/polyfill';
import 'whatwg-fetch';

export default {
  
  async addSurvey(details) {
    try {
      let res = await fetch('/api/surveys', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
