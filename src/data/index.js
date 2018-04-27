/**
 * @file 数据接口层
 * @author wangxingzhuo<wangxingzhuo@baidu.com>
 */

import axios from 'axios';
import queryString from 'query-string';
const underline = '_';

function toUrlencode(params) {
    return queryString.stringify(params);
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 5000;

function accessInterface(config, errmsg = '接口异常') {
    config.headers = config.headers || {};
    config.params = config.params || {};

    // 默认添加时间戳和缓存no-cache
    config.params[underline] = Date.now();
    config.headers['cache-control'] = 'no-cache';

    // 默认将请求体转成字符串
    const contentType = config.headers['Content-Type'];
    if (
        config.data
        && typeof config.data !== 'string'
        && contentType !== 'application/json'
        && contentType !== 'multipart/form-data'
    ) {
        config.data = toUrlencode(config.data || {});
    }

    return axios(config)
    .then(res => {
        const data = res.data;
        // 接口返回失败消息
        if (data.status !== 0) {
            return Promise.reject(data.message);
        }
        return data.result;
    })
    .catch(err => Promise.reject(errmsg));
}

export function helloWorld(params) {
    accessInterface({url: '/helloworld.json', params});
    return Promise.resolve({
        msg: 'hola'
    });
}
