import http from './httprequest.js'
const {
	get,
	post
} = http

// 获取accessToken信息
export const getAccessToken = (params) => {
	const url = "/api/wechat/open/getAccessToken";
	return new Promise((resolve, reject) => {
		get(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			} 
		})
	})
}

// 获取用户信息
export const getUserInfo = (params) => {
	const url = "/api/wechat/open/getUserInfo";
	return new Promise((resolve, reject) => {
		get(url, params).then(res => {
			if (res.statusCode === 200) {
				resolve(res.data)
			} 
		})
	})
}

// 获取js签名
export const getJsapiSign = (params) => {
  const url = "/api/wechat/open/getJsapiSign";
  return new Promise((resolve, reject) => {
    get(url, params).then((res) => {
      if (res.statusCode === 200) {
        resolve(res.data);
      }
    });
  });
};

// 推送订阅
export const sendSubscribeMessage = (params) => {
  const url = "/api/wechat/open/sendSubscribeMessage";
  return new Promise((resolve, reject) => {
    post(url, params).then((res) => {
      if (res.statusCode === 200) {
        resolve(res.data);
      }
    });
  });
};