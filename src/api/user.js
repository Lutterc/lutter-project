import axios from 'axios';

export function login(data) {
  return axios.post('/api/user/login', data);
}