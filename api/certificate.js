import http from './httprequest.js'
const {
	get,
	post
} = http

// 获取学校列表
export const getSchoolList = (dto) => {
	const url = '/api/member/training/school/list'
	return new Promise((resolve, reject) => {
		get(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 提交信息
export const saveInfo = (dto) => {
	const url = '/api/member/training/info/save'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 获取证书
export const getCert = (dto) => {
	const url = '/api/member/training/cert/generate'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

//发送邮件
export const sendmail = (dto) => {
	const url = '/api/member/training/email/send/cert'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}




