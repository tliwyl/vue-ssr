/**
 *  created on 2019-10-31.
 *  author litao
 */
import axios from 'axios';
/*export const createAxiosInstance = (options) => {
    return axios.create(options);
}*/
export const createAxiosInstance = (isServer) => {
    const options = {
        baseURL: '/',
        params: {
            token: new Date()
        }
    };
    isServer && (options.baseURL = 'http://localhost:8080/');
    return axios.create(options);
};
export const axiosInstance = createAxiosInstance(true);
