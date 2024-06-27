import Axios, {
    AxiosRequestConfig, AxiosResponse, Method, ResponseType,
} from 'axios'
import {message} from "antd";

interface IAxiosData {
    url: string
    method: Method
    headers?: any
    json: boolean
    contentType?: string
    data?: any
    params?: any
    timeout?: number
    responseType?: ResponseType
}

// const baseURL = 'http://www.mock.com'
const axios = Axios.create({
    baseURL: process.env.VITE_APP_API_URL,
    timeout: 20000,
})
// 允许携带cookie
axios.defaults.withCredentials = true
// 请求头信息
// @ts-ignore
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 默认使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 获取token
        const token = localStorage.getItem('token')
        if (token) {
            // @ts-ignore
            config.headers['x-auth-token'] = token
        }
        return config
    },
    (err) => Promise.reject(err),
)

// 响应拦截器
axios.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err) => {
        if (err.response?.status === 401) {
            return Promise.reject(err)
        }
        if (err.response && err.response.data) {
            const msg = err.response.data.message.value
            message.error(msg)
        } else {
            message.error(`${err}`)
        }
        return Promise.reject(err)
    },
)

/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas  //token在datas中
 *
 */
export default function request<T>(arr: IAxiosData): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        // arr = requestValidate(arr)
        axios({
            timeout: arr.timeout === undefined ? 10000 : arr.timeout, // 请求超时时间
            url: arr.url,
            method: arr.method || 'POST',
            headers: {
                // 'Authorization': arr.token || '',
                // eslint-disable-next-line no-nested-ternary
                'content-type': arr.contentType ? arr.contentType : arr.json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            params: arr.params || '',
            data: arr.data || '',
            responseType: arr.responseType || 'json',
        })
            .then((response: AxiosResponse<any>) => {
                /**
                 * response格式
                 *
                 * {
                 data:{},
                 status:200,
                 statusText:'OK',//从服务器返回的http状态文本
                 headers: {},//响应头信息
                 config: {} //`config`是在请求的时候的一些配置信息
                 }
                 */
                const responseStatus = `${response.status}`
                // 状态码2开头的处理逻辑
                if (responseStatus.charAt(0) === '2') {
                    if (response.data.code === '1' || response.data.code === 'err_9999') {
                        message.error(response.data.message.value)
                        reject(response.data)
                        return
                    }
                    if (response.data.code === '401') {
                        message.error(response.data.message)
                        reject(response.data);
                        return;
                    }

                    if (response.headers['captcha-token']) {
                        const {data} = response
                        const token = response.headers['captcha-token']
                        response.data = {
                            data,
                            token,
                        }
                        resolve(response.data)
                    }

                    resolve(response.data)
                } else {
                    message.error(response.data.message.value)
                    reject(response.data)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
