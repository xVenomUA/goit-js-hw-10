import { Notify } from 'notiflix';
import axios, { Axios } from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bKkP5sdqYhKCDOuk3F9zZUnhE0OowjsU0wDLGPCIIPurZptzPaUesVO0tQ9QBS2v';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
let response = axios.get('https://api.thecatapi.com/v1/breeds');
console.log(response);