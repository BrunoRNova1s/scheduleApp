import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/BrunoRNova1s/scheduleApp/'
});

export default api