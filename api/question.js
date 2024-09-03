import http from './httprequest.js'
const {
	get,
	post
} = http


// 生成题库
export const getQuestionList = (dto) => {
	const url = '/api/member/training/question/generate'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 提交答案
export const submitQuestion = (dto) => {
	const url = '/api/member/training/question/submit'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}
