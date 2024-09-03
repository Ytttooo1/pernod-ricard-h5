import sysConfig from "../api/config";
import wx from "weixin-js-sdk";
import {
	getAccessToken,
	getUserInfo,
	getJsapiSign,
	sendSubscribeMessage,
} from "../api/wechat";
import {
	registerMember,
	getSimpleMember,
} from "../api/member";
/**
 * 微信授权
 * @param {object} option 
 * @param {string} scope 应用授权作用域: snsapi_base.仅授权openid  snsapi_userinfo.用户昵称、性别、所在地
 * @returns 
 */
const auth = (option, scope) => {
	return new Promise((resolve, reject) => {
		var openId = option.openId;
		if (openId) {
			uni.setStorageSync("openId", openId);
			resolve(openId);
		} else {
			openId = uni.getStorageSync("openId");
			if (openId) {
				resolve(openId);
			}
		}

		// 链接上和缓存都未包含openId
		if (!option.code) {
			goWechatAuth(scope);
		} else if (!openId) {
			// code存在表示是页面A2
			// history.pushState({
			// 	page: 1
			// }, null, window.location.href);
			// 通过code换取openId
			getAccessToken({
				code: option.code
			}).then((tokenRes) => {
				console.log("getAccessToken:", tokenRes);
				openId = tokenRes.data.openid;
				uni.setStorageSync("openId", tokenRes.data.openid);
				uni.setStorageSync("unionId", tokenRes.data.unionid);
				uni.setStorageSync("wxToken", tokenRes.data);

				if (scope == "snsapi_userinfo") {
					// 授权作用域为：snsapi_userinfo，则获取token后再获取微信用户信息
					const userParams = {
						accessToken: tokenRes.data.access_token,
						openId: openId,
					};
					getUserInfo(userParams).then((userRes) => {
						console.log("getUserInfo:", userRes);
						uni.setStorageSync("wxUser", userRes.data);
						resolve(openId);
					});
				} else {
					resolve(openId);
				}
			});
		} else {
			resolve(openId);
		}
	});
};
const register = (option, scope) => {
	return new Promise((resolve, reject) => {
		if (!scope || scope == "snsapi_base") {
			auth(option, scope).then((openId) => {
				if (openId) {
					getSimpleMember({
						openId: openId
					}).then(detailRes => {
						console.log("detailRes:", detailRes.data)
						if (!detailRes.data.id) {
							console.warn("未注册")
							// 未注册
							var user = uni.getStorageSync("wxToken");
							var sourceChannel = uni.getStorageSync("sourceChannel") ||
								"default";
							var member = {
								openId: user.openid,
								unionId: user.unionid,
								sourceChannel: sourceChannel
							}
							registerMember(member).then((registerRes) => {
								console.log("registerMember:", registerRes);
								resolve(openId);
							});
						} else {
							console.warn("已注册")
							// 已注册
							resolve(openId);
						}
					})
				}
			});
		} else if (scope == "snsapi_userinfo") {
			auth(option, scope).then((openId) => {
				if (openId) {
					getSimpleMember({
						openId: openId
					}).then(detailRes => {
						console.log("detailRes:", detailRes.data)
						if (!detailRes.data.id) {
							console.warn("未注册")
							// 未注册
							var user = uni.getStorageSync("wxUser");
							var sourceChannel = uni.getStorageSync("sourceChannel") ||
								"default";
							var member = {
								avatar: user.headimgurl,
								nickName: user.nickname,
								openId: user.openid,
								unionId: user.unionid,
								sourceChannel: sourceChannel
							}
							registerMember(member).then((registerRes) => {
								console.log("registerMember:", registerRes);
								resolve(openId);
							});
						} else {
							console.warn("已注册")
							// 已注册
							resolve(openId);
						}
					})
				}
			})

		}
	})
}

const config = () => {
	var sourceUrl = encodeURIComponent(window.location.href);
	console.log(sourceUrl)
	var jsApiList = [
		"onMenuShareTimeline",
		"onMenuShareAppMessage",
		"onMenuShareQQ",
		"onMenuShareQZone",
		"hideMenuItems",
		"updateAppMessageShareData",
		"updateTimelineShareData",
		"closeWindow",
	];
	getJsapiSign({
		url: sourceUrl
	}).then((res) => {
		var data = res.data;
		var configData = {
			debug: sysConfig
				.wxDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
			appId: sysConfig.wxAppId, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名
			jsApiList: jsApiList, // 必填，需要使用的JS接口列表
			openTagList: ["wx-open-subscribe"], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
		};
		wx.config(configData);
	});
}

/**
 * 推送公众号模板消息
 * @param {string} templateId 模板id
 * @param {object} data 消息内容
 * @param {string} page 跳转链接
 */
const send = (templateId, data, page) => {
	var params = {
		contentColor: "",
		contentValue: "",
		dataMap: data,
		miniProgram: {
			appid: "",
			pagePath: "",
			usePath: true,
		},
		page: page,
		scene: "",
		templateId: templateId,
		title: "",
		toUser: uni.getStorageSync("openId"),
		url: "",
	};
	sendSubscribeMessage(params);
};

/**
 * 跳转微信授权页
 * @param {string} scope 应用授权作用域，
 * snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），
 * snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
 * @param {string} state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
 */
const goWechatAuth = (scope, state) => {
	state = state ? state : 1;
	scope = scope ? scope : "snsapi_base";
	var sourceUrl = encodeURIComponent(window.location.href);

	// created中注册监听popstate状态变化
	window.addEventListener('popstate', () => {
		console.log('关闭微信页面')
		window.WeixinJSBridge.invoke('closeWindow')
	})
	// 页面A1 首次授权
	const ua = window.navigator.userAgent.toLowerCase();
	const isWeixin = /micromessenger/i.test(ua);
	if (isWeixin) {
		// 微信环境
		const REDIRECT_URI = encodeURIComponent(window.location.href)
		var authUrl =
			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${sysConfig.wxAppId}&redirect_uri=${sourceUrl}&response_type=code&scope=${scope}&state=${state}&component_appid=${sysConfig.wxComponentAppId}#wechat_redirect`;

		// 静默授权伪代码
		location.replace(authUrl)
	} else {
		console.log('当前不是微信环境');
	}

};

// 获取查询参数
function getSearch(key) {
	var hash = window.location.hash.replace(/^#(.*\?)?/, '');
	var search = window.location.search.replace(/^\?/, '');
	var pattern = new RegExp('(?:^|&)' + key + '=(.*?)(?:&|$)');
	var result = pattern.exec(hash + '&' + search);
	return result ? decodeURIComponent(decodeURIComponent(result[1])) : '';
}

// 将含有emoji的字符串转换为unicode编码
function toUnicode(str) {
  return str.replace(/[\u0000-\u00ff]/g, function(match) {
    return "\\u" + match.charCodeAt(0).toString(16);
  });
}

const shareHome = (channel) => {
	config();
	channel = channel || uni.getStorageSync("sourceChannel");
	channel = String(channel).split('')[0] + "A"
	let imgUrl = `${sysConfig.staticUrl}/images/share/share.jpg`;
	let linkUrl = `${window.location.origin}/?sourceChannel=${channel}`
	
	wx.ready(function() {
		// 禁用复制链接按钮
		console.log("禁用复制链接按钮")
		wx.hideMenuItems({
			menuList:["menuItem:copyUrl"]
		})
		
		// 注意：只有以下三种途径才能自定义分享（通过链接无法正常分享）
		// 1.公众号菜单访问后分享
		// 2.生成二维码，识别二维码后分享
		// 3.访问页面后添加到收藏，从微信收藏中进入后分享
		// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
		wx.updateAppMessageShareData({
			title: '理性青年驾到「清醒驾驶」训练营', // 分享标题
			desc: toUnicode('火热开营中，酒驾🤺退！🤺退！🤺退！'), // 分享描述
			link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: imgUrl, // 分享图标
			success: function() {
				console.log("分享好友成功")
				console.log(linkUrl,'分享链接');
			}
		})

		// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
		wx.updateTimelineShareData({
			title: '理性青年驾到「清醒驾驶」训练营', // 分享标题
			link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: imgUrl, // 分享图标
			success: function() {
				console.log("分享朋友圈成功")
			}
		})
	})
}

export default {
	auth,
	config,
	send,
	register,
	shareHome,
	goWechatAuth,
};