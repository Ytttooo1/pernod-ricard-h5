<template>
	<view class="box home-box">
		<music-main ref="music-main" class="music-main"></music-main>
		<view class="trabecula-top">
			<img :src="staticUrl + '/images/home/home-trabecula.png'" alt="">
		</view>
		<view class="trabecula-bottom">
			<img :src="staticUrl + '/images/home/home-trabecula.png'" alt="">
		</view>
		<view class="title">
			<img :src="staticUrl + '/images/home/home-title.png'" alt="">
		</view>

		<view class="box-cer">
			<img class="cert-img" :src="certImg" alt="">
			<view class="btn email-btn" @click="handleEmail()"></view>
			<view class="btn return-btn" @click="handleReturn()"></view>
		</view>
		
		<mask-adaptive></mask-adaptive>

	</view>
</template>

<script>
	import Config from "../../api/config.js";
	const {
		activityCode
	} = Config;
	import {
		getMember
	} from '@/api/index.js'
	import {
		getCert,
		sendmail
	} from "../../api/certificate.js"
	import wx from 'weixin-js-sdk'
	import wechatUtil from '@/util/wechat.js'
	export default {
		data() {
			return {
				timer: null,
				audioStatus: true,
				audioContext: null,
				member: {},
				recordId: "",
				certImg: this.staticUrl + "/images/certificate/template-cert.png",
				isPass: 0
			}
		},
		onUnload() {
			this.$refs['music-main'].disconnect();
		},
		onShow() {
			if (this.$refs['music-main']) {
				this.$refs['music-main'].start();
			}
		},
		onHide() {
			this.$refs['music-main'].stop();
		},
		mounted() {
			this.loading = true
			this.$refs['music-main'].initMusic("/static/music/other.mp3")
			wechatUtil.shareHome();
			let params = {
				activityCode: Config.activityCode,
				openId: uni.getStorageSync('openId')
			}
			getMember(params).then(res => {
				if (res.success) {
					this.member = res.data;
					// 未完成答题
					this.recordId = this.member.record.id;
					if (this.recordId) {
						getCert({
							recordId: this.recordId
						}).then(certRes => {
							if (certRes.success) {
								this.certImg = certRes.data;
							}
						})
					}
				}
			})

		},
		methods: {
			handleEmail() {
				sendmail({
					recordId: this.recordId
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			handleReturn() {
				uni.redirectTo({
					url: `/pages/question/result?isPass=1`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-box {
		background-image: url($staticUrl + "/images/home/home-bg.jpg");
		background-size: 100% 100%;

		.music-main {
			position: absolute;
			top: 70rpx;
			right: 13rpx;
			z-index: 999;
		}

		.trabecula-top {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;

			img {
				width: 100%;
				height: 50rpx;
				display: flex;
			}
		}

		.trabecula-bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;

			img {
				width: 100%;
				height: 50rpx;
				display: flex;
			}
		}

		.music-icon {
			position: absolute;
			top: 70rpx;
			right: 13rpx;
			animation: spin 2.5s linear infinite;

			img {
				width: 56rpx;
				height: 56rpx;
				display: block;
			}

			&.suspend {
				animation: spin 2.5s linear infinite paused;
			}

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}

				100% {
					transform: rotate(360deg);
				}
			}
		}

		.title {
			position: absolute;
			top: 131rpx;
			left: 71rpx;

			img {
				width: 664rpx;
				height: 1001rpx;
				display: block;
			}
		}

		.box-cer {
			width: 650rpx;
			height: 835rpx;
			position: absolute;
			left: 50rpx;
			top: 420rpx;
			background-image: url($staticUrl + "/images/certificate/bg-zs.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.cert-img {
				width: 90%;
				margin: 7% 5%;
				box-shadow: 2rpx 2rpx 20rpx 0px rgba(31, 31, 31, 0.29);

			}

			.btn {
				position: absolute;
				width: 90%;
				height: 90rpx;
				left: 5%;
			}

			.email-btn {
				bottom: 180rpx;
			}

			.return-btn {
				bottom: 80rpx;
			}
		}

		@media (max-height: 700px) {
			.box-cer {
				top: 290rpx;
				transform: scale(.8);
			}
		}
	}
</style>