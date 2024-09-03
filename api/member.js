import http from './httprequest.js'
const {
	get,
	post
} = http

// 注册会员
export const registerMember = (dto) => {
	const url = '/api/member/register'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 注册会员
export const getSimpleMember = (params) => {
	const url = '/api/member/detail'
	return new Promise((resolve, reject) => {
		get(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}