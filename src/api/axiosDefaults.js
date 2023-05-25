import axios from 'axios';

axios.defaults.baseURL = 'https://react-social-media-kes.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;