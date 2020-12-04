import { request } from '@/plugins/request';

// 获取 tags
export const getTags = () => {
    return request({
        method: 'GET',
        url: '/api/tags'
    })
}