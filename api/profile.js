import { request } from '@/plugins/request';

// 获取 tags
export const getProfiles = username => {
    return request({
        method: 'GET',
        url: `api/profiles/${username}`
    })
}