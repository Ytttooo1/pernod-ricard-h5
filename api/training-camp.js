import http from './httprequest.js'
const {
	get,
	post
} = http

// 查看活动进度
export const getLearningProcess = (dto) => {
	const url = '/api/member/learning/process'
	return new Promise((resolve, reject) => {
		get(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 查看活动进度
export const getLearningSubmit = (dto) => {
	const url = '/api/member/learning/submit'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}
