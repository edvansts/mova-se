import axios, { Axios } from 'axios';

const AxiosMain = axios.create({
    baseURL: '/api',
});

export function setAuthorizationToken(token: string) {
    AxiosMain.defaults.headers.common['Authorization'] = token;
}

export default AxiosMain;
