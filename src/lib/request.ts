// @ts-nocheck
import Axios, { AxiosRequestConfig, AxiosResponse, Method, ResponseType } from 'axios';
import { message } from 'antd';

interface IAxiosData {
    url: string;
    method: Method;
    headers?: any;
    json: boolean;
    contentType?: string;
    data?: any;
    params?: any;
    timeout?: number;
    responseType?: ResponseType;
}

const axios = Axios.create({
    baseURL: process.env.VITE_APP_API_URL,
    timeout: 20000,
});

axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

axios.interceptors.response.use(
    (res: AxiosResponse<any>) => res,
    (err) => {
        if (err.response?.status === 401) {
            return Promise.reject(err);
        }
        if (err.response && err.response.data) {
            const msg = err.response.data.message.value;
            message.error(msg);
        } else {
            message.error(`${err}`);
        }
        return Promise.reject(err);
    }
);

export default function request<T>(reqConfig: IAxiosData): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        axios({
            timeout: reqConfig.timeout ?? 10000,
            url: reqConfig.url,
            method: reqConfig.method || 'POST',
            headers: {
                'content-type': reqConfig.contentType
                    ? reqConfig.contentType
                    : reqConfig.json
                        ? 'application/json; charset=UTF-8'
                        : 'application/x-www-form-urlencoded; charset=UTF-8',
                ...reqConfig.headers, // Additional headers from request config
            },
            params: reqConfig.params || '',
            data: reqConfig.data || '',
            responseType: reqConfig.responseType || 'json',
        })
            .then((response: AxiosResponse<any>) => {
                const responseStatus = `${response.status}`;
                if (responseStatus.charAt(0) === '2') {
                    if (response.data.code === '1' || response.data.code === 'err_9999') {
                        message.error(response.data.message.value);
                        reject(response.data);
                    } else if (response.data.code === '401') {
                        message.error(response.data.message);
                        reject(response.data);
                    } else if (response.headers['captcha-token']) {
                        const { data } = response;
                        const token = response.headers['captcha-token'];
                        response.data = {
                            data,
                            token,
                        };
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                } else {
                    message.error(response.data.message.value);
                    reject(response.data);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}
