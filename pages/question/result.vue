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

		<view v-show="isPass==1" class="box-pass">
			<view class="btn btn-1" @click="handleCert()"></view>
			<view class="btn btn-2" @click="handleDraw()"></view>
			<view class="btn btn-3" @click="handleShare()"></view>
			<view class="btn btn-4" @click="handleBackHome()"></view>
		</view>
		<view v-show="isPass==0" class="box-no-pass">
			<view class="btn" @click="handlePlayAgain()"></view>
		</view>
		
		<mask-adaptive></mask-adaptive>

	</view>


</template>

<script>
	import Config from "../../api/config.js";
	import {
		getMember
	} from '@/api/index.js'
	const {
		activityCode
	} = Config;
	import wx from 'weixin-js-sdk'
	import wechatUtil from '@/util/wechat.js'
	export default {
		mounted() {
			this.loading = true
			this.$refs['music-main'].initMusic("/static/music/other.mp3")
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
		onLoad(option) {
			this.isPass = option.isPass;
			this.openId = uni.getStorageSync("openId")
			wechatUtil.shareHome();
			if (!this.openId) {
				wechatUtil.auth(option).then((res) => {
					this.openId = res;
				})
			}

			let params = {
				activityCode: Config.activityCode,
				openId: uni.getStorageSync('openId')
			}
			getMember(params).then(res => {
				if (res.success) {
					this.member = res.data;
					// 未完成答题
					// if (!this.member.record.id) {
					// 	this.handlePlayAgain();
					// }
				}
			})
		},
		data() {
			return {
				member: {},
				timer: null,
				isPass: -1
			}
		},
		methods: {
			handleCert() {
				let redirect = encodeURIComponent("/pages/certificate/index");
				if (this.member && this.member.record) {
					if (this.member.record.email) {
						uni.redirectTo({
							url: `/pages/certificate/index`
						});
					} else {
						uni.redirectTo({
							url: `/pages/certificate/form?redirect=${redirect}`
						});
					}
				}
			},
			handleDraw() {
				let redirect = encodeURIComponent("/pages/draw/index");
				if (this.member && this.member.record) {
					if (this.member.record.email) {
						uni.redirectTo({
							url: `/pages/draw/index`
						});
					} else {
						uni.redirectTo({
							url: `/pages/certificate/form?redirect=${redirect}`
						});
					}
				}
			},
			handleShare() {
				uni.redirectTo({
					url: `/pages/share/index`
				});
			},
			handleBackHome() {
				uni.redirectTo({
					url: `/pages/home/index`
				});
			},
			handlePlayAgain() {
				uni.redirectTo({
					url: `/pages/home/index`
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

		.box-pass {
			width: 600rpx;
			height: 830rpx;
			position: absolute;
			left: 75rpx;
			top: 370rpx;
			background-image: url($staticUrl + "/images/question/img-pass.png?2");
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.btn {
				position: absolute;
			}

			.btn-1 {
				width: 230rpx;
				height: 60rpx;
				left: 50rpx;
				bottom: 270rpx;
			}

			.btn-2 {
				width: 230rpx;
				height: 60rpx;
				left: 320rpx;
				bottom: 270rpx;
			}

			.btn-3 {
				width: 500rpx;
				height: 60rpx;
				left: 50rpx;
				bottom: 170rpx;
			}

			.btn-4 {
				width: 500rpx;
				height: 60rpx;
				left: 50rpx;
				bottom: 60rpx;
			}
		}

		.box-no-pass {
			width: 600rpx;
			height: 700rpx;
			position: absolute;
			left: 75rpx;
			top: 450rpx;
			background-image: url($staticUrl + "/images/question/img-no-pass.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.btn {
				position: absolute;
				width: 260rpx;
				height: 60rpx;
				left: 160rpx;
				bottom: 100rpx;
			}
		}

		@media (max-height: 700px) {
    	.box-pass{
				top: 310rpx;
				transform: scale(.8);
			}
			.box-no-pass{
				top: 330rpx;
				transform: scale(.8);
			}
		}

	}
</style>