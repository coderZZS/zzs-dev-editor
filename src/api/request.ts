/*
 * @Descripttion: axios请求封装
 * @Author: BZR
 * @Date: 2021-12-24 10:26:12
 * @LastEditTime: 2022-11-07 17:48:11
 */
import axios, { Axios, AxiosResponse } from 'axios'
// 创建实例
const timeout = 10000
const http = axios.create({
    // baseURL: process.env.VUE_APP_BASEURL, // 请求地址
    timeout, // 超时时间
    withCredentials: false
    // withCredentials: true,
})

const apis: {[key: string]: string} = {
    '/api': import.meta.env.VITE_APP_API
}

// 请求拦截
http.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

// 响应拦截
http.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        return Promise.reject(err)
    }
)

interface RequestParams {
    url: string
    params?: any
    data?: any
    server?: string
}

function getURL (server: string, url: string) {
    return apis[server] + url
}
/**
 * get请求
 * @param { url, params, server }
 * @returns 数据
 */
export const get =  <T = AxiosResponse> ({ url, params, server = '/api' }: RequestParams):  Promise<T> => {
    const URL = getURL(server, url)
    return new Promise((resolve, reject) => {
        http.get(URL, {
            params: params || {},
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * post请求
 * @param { url, data, isLoading, server }
 * @returns 数据
 */
export const post = <T = AxiosResponse> ({ url, data, server = '/api', params }: RequestParams): Promise<T> => {
    const URL = getURL(server, url)
    console.log('URL', URL);
    
    return new Promise((resolve, reject) => {
        http.post(URL, data || {}, {
            params,
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
