<template>
	<view @click="onMusic" :class="{suspend: !playEnable}" class="music-main">
		<img :style="{width:width + 'rpx',height:height + 'rpx'}" :src="staticUrl + '/images/home/home-music-icon.png'"
			alt="">
	</view>
</template>

<script>
	export default {
		mounted() {
			this.playEnable = uni.getStorageSync("music_enable");
		},
		props: {
			width: {
				type: [String, Number],
				default: 56
			},
			height: {
				type: [String, Number],
				default: 56
			}
		},
		data() {
			return {
				musicUrl: "",
				playEnable: true
			}
		},
		methods: {
			stop() {
				this.musicUtil.stop(this.musicUrl);
			},
			start() {
				this.musicUtil.start(this.musicUrl);
			},
			disconnect() {
				this.musicUtil.disconnect(this.musicUrl);
			},
			onMusic() {
					this.musicUtil.change(this.musicUrl).then(
						()=>{
							this.playEnable = uni.getStorageSync("music_enable");
						},
						()=>{
							this.playEnable = false
						}
					)
			},
			initMusic(url) {
				this.musicUrl = url;
				this.musicUtil.load(this.musicUrl);
			}
	},
	}
</script>

<style lang="scss" scoped>
	.music-main {
		animation: spin 2.5s linear infinite;

		img {
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
</style>