import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-48244.firebaseio.com/'
});

export default instance;