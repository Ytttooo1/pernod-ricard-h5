import http from './httprequest.js'
const {
	get,
	post
} = http

// 获取用户信息
export const getMember = (params) => {
	const url = '/api/member/training/detail'
	return new Promise((resolve, reject) => {
		get(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 抽奖
export const lottery = (params) => {
	const url = '/api/member/training/lottery'
	return new Promise((resolve, reject) => {
		post(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			} else {
				if(res.data.msg.includes("IP")) {
					uni.showToast({
						icon: "none",
						title: "抽奖累了，请歇会再操作"
					})
				} else {
					uni.showToast({
						icon: "none",
						title: res.data.msg
					})
				}
			}
		})
	})
}

// 发邮件
export const sendGiftMail = (params) => {
	const url = '/api/member/training/email/send/gift'
	return new Promise((resolve, reject) => {
		post(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 获取海报
export const getShare = (dto) => {
	const url = '/api/member/training/share/generate'
	return new Promise((resolve, reject) => {
		post(url, dto).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			}
		})
	})
}

// 埋点
export const record = (params) => {
	return new Promise((resolve, reject) => {
		let uri = '/api/activity/event-tracking/save';
		post(uri, params).then((res) => {
			if (res.statusCode === 200) {
				resolve(res.data);
			}
		})
	})
}



