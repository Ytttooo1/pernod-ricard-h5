<template>
	<view class="box home-box">
		<music-main ref="music-main" class="music-main"></music-main>
		<view class="trabecula-top">
			<img :src="staticUrl + '/images/home/home-trabecula.png'" alt="">
		</view>
		<view class="trabecula-bottom">
			<img :src="staticUrl + '/images/home/home-trabecula.png'" alt="">
		</view>
		<music-main ref="music-main" class="music-main"></music-main>
		<view class="title">
			<img :src="staticUrl + '/images/home/home-title.png'" alt="">
		</view>

		<view @longpress="onLongPress" class="box-share">
			<img v-show="shareImg" class="share-img" :src="shareImg" alt="">
			<img class="text-img" :src="staticUrl + '/images/home/share-text.png'" alt="">
		</view>

		<view @click="handleReturn" class="return-btn">
			<img :src="staticUrl + '/images/home/return-btn.png'" alt="">
		</view>

		<mask-adaptive></mask-adaptive>
	</view>
</template>

<script>
	import Config from "../../api/config.js";
	import wechatUtil from '@/util/wechat.js'
	import {
		getMember,
		getShare
	} from '@/api/index.js'
	export default {
		data() {
			return {
				timer: null,
				audioStatus: true,
				audioContext: null,
				member: {},
				recordId: "",
				shareImg: "",
				isPass: 0
			}
		},
		mounted() {
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
						let	channel = uni.getStorageSync("sourceChannel") || ""
						channel = String(channel).split('')[0] + "B"
						getShare({
							recordId: this.recordId,
							url: window.location.origin + "/",
							sourceChannel: channel
						}).then(shareRes => {
							if (shareRes.success) {
								this.shareImg = shareRes.data;
							}
						})
					}
				}
			})

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
		methods: {
			handleReturn() {
				uni.redirectTo({
					url: '/pages/question/result?isPass=1'
				});
			},
			onLongPress(){
				let params = {
            stayTime: 0,
						signName:"海报下载",
            route: this.$route
        }
        this.$record.logPageSheet(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-box {
		background-image: url($staticUrl + "/images/home/home-bg.jpg");
		background-size: 100% 100%;

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

		.music-main {
			position: absolute;
			top: 70rpx;
			right: 13rpx;
		}

		.title {
			position: absolute;
			top: 131rpx;
			left: 71rpx;

			img {
				width: 614rpx;
				height: 950rpx;
				display: block;
			}
		}

		.box-share {
			width: 537rpx;
			height: 778rpx;
			box-sizing: border-box;
			padding: 12rpx;
			padding-bottom: 50rpx;
			position: absolute;
			left: 50%;
			top: 370rpx;
			transform: translateX(-50%);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-color: #fff;

			.share-img {
				width: 100%;
				height: 719rpx;
				box-sizing: border-box;
				display: block;
			}

			.text-img {
				width: 247rpx;
				height: 21rpx;
				display: block;
				position: absolute;
				bottom: 13rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.return-btn {
			position: absolute;
			top: 1167rpx;
			left: 50%;
			transform: translateX(-50%);

			img {
				width: 540rpx;
				height: 80rpx;
				display: block;
			}
		}

		@media (max-height: 700px) {
    	.box-share {
				top: 280rpx;
				transform:translateX(-50%) scale(.8);
			}
			.return-btn {
				top: 1000rpx;
				transform:translateX(-50%) scale(.8);
			}
		}
	}
</style>