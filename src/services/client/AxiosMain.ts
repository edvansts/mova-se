import axios from 'axios';

const AxiosMain = axios.create({
    baseURL: '/api',
});

export default AxiosMain;
