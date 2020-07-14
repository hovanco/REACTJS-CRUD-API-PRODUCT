import axios from 'axios';
import * as Config from './../constants/Config';

export default function callApi(endpoint, method = 'GET', body){
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b3duaG91c2Vyc3VwZXJhZG1pbiIsImlhdCI6MTU5NDYyMDQ4MiwiZXhwIjoxNjEwNjgyNDgxfQ.wy2J46Xy4Nm3KuwyCui7ct7Fjx6fkIddXIY66iaq3rSpk9pTlQz5iqE7a7HHNQQ6RtQ2O-HLw8PR0cCknot-2w",
    },
  }).catch(err => {
    console.log(err);
  });
};
