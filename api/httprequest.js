import qs from "qs";
import Config from "./config.js";
import {
	Base64
} from 'js-base64';
//访问域名：http://fe.dev.zhiytech.work:8088/
const {
	apiHost
} = Config;

const tenantId = "000000";
const authorization = `Basic ${Base64.encode(`${'saber'}:${'saber_secret'}`)}`;

const get = (url, params) => {
	const uri = params ?
		`${apiHost}${url}?${qs.stringify(params)}` :
		`${apiHost}${url}`;
	const accessToken = uni.getStorageSync("access_token");
	const xxx =
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcxMzk3ODg1MCwibmJmIjoxNzEzOTY0NDUwfQ.VJXFr48BbMvd_cM2cTgSrsaoywHMRvy60me3HbC0BXPYvp7IpFQ70QO_NaGeczCflefFo6FdW07e-U881OUsmw"
	const header = {};
	header["Authorization"] = authorization;
	header["Tenant-Id"] = tenantId;
	// if (accessToken) {
	header["Blade-Auth"] = `bearer ${xxx}`;
	// }
	if (
		url.indexOf('/activity/event-tracking/save') == -1 &&
		url.indexOf('/member/training/email/send/gift') == -1 &&
		url.indexOf('/member/training/detail') == -1 &&
		url.indexOf('/member/training/lottery') == -1 &&
		url.indexOf('/member/learning/submit') == -1 &&
		url.indexOf('/member/learning/process') == -1
	) { // 将此类接口不显示加载中loading
		// uni.showLoading({
		// 	title: "加载中...",
		// 	mask: true,
		// });
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: uri,
			method: "GET",
			header: {
				...header,
			},
			dataType: "JSON",
			timeout: 20000,
			success: (res) => {
				uni.hideLoading();
				resolve(res);
			},
			fail: (error) => {
				reject(error);
			},
		});
	});
};

const post = (url, params) => {
	const uri = `${apiHost}${url}`;
	const accessToken = uni.getStorageSync("access_token");
	const header = {};
	header["Authorization"] = authorization;
	header["Tenant-Id"] = tenantId;
	// if (accessToken) {
	header["Blade-Auth"] = `bearer ${accessToken}`;
	// }
	if (
		url.indexOf('/activity/event-tracking/save') == -1 &&
		url.indexOf('/member/training/email/send/gift') == -1 &&
		url.indexOf('/member/training/detail') == -1 &&
		url.indexOf('/member/training/lottery') == -1 &&
		url.indexOf('/member/learning/submit') == -1
	) { // 将此类接口不显示加载中loading
		// uni.showLoading({
		// 	title: "加载中...",
		// 	mask: true,
		// });
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: uri,
			method: "POST",
			header: {
				...header,
			},
			data: params,
			dataType: "JSON",
			timeout: 20000,
			success: (res) => {
				uni.hideLoading();
				resolve(res);
			},
			fail: (error) => {
				reject(error);
			},
		});
	});
};

export default {
	get,
	post
};