import http from './httprequest.js'
const {
	get,
	post
} = http

// 活动信息查看
export const getActivityInfo = (params) => {
	const url = '/api/activity/info'
	return new Promise((resolve, reject) => {
		get(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

