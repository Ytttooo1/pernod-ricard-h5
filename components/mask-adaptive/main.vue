<template>
	<view v-show="isHorizontal" class="mask-hide">
		<text class="txt">请竖屏浏览当前页面</text>
	</view>
</template>

<script>
	export default {
		mounted() {
			this.adaptive()
			window.addEventListener("resize", (event) => {
				this.adaptive()
			}, false);
			// 监听方向变化的事件
			// window.addEventListener('orientationchange', (event) => {
			// 	this.adaptive()
			// }, false);
		},
		data() {
			return {
				isFirstH:0,
				isHorizontal:false
			}
		},
		methods: {
			adaptive() {
				let width = document.documentElement.clientWidth
				let height = document.documentElement.clientHeight
				if (width < height) { //竖屏
					this.isHorizontal = false
					if(this.isFirstH == 0){
						this.isFirstH = 2
					}else if(this.isFirstH == 1){
						setTimeout(() => {
						    this.$router.go(0)
						}, 10)
					}
				} else { //横屏
					console.log('现在是横屏模式。');
					// 横屏模式下的处理逻辑
					this.isHorizontal = true
					if(this.isFirstH == 0){
						this.isFirstH = 1
					}
				}
				
				// if (window.innerWidth < window.innerHeight) { //竖屏
				// 	this.isHorizontal = false
				// 	if(this.isFirstH == 0){
				// 		this.isFirstH = 2
				// 	}else if(this.isFirstH == 1){
				// 		setTimeout(() => {
				// 		    this.$router.go(0)
				// 		}, 100)
				// 	}
				// } else { //横屏
				// 	this.isHorizontal = true

				// 	if(this.isFirstH == 0){
				// 		this.isFirstH = 1
				// 	}
				// }
				
				// if (window.matchMedia("(orientation: portrait)").matches) {
				// 	console.log('现在是竖屏模式。');
				// 	this.isHorizontal = false
				// 	if(this.isFirstH == 0){
				// 		this.isFirstH = 2
				// 	}else if(this.isFirstH == 1){
				// 		setTimeout(() => {
				// 		    this.$router.go(0)
				// 		}, 10)
				// 	}
				// 	// 竖屏模式下的处理逻辑
				// } else if (window.matchMedia("(orientation: landscape)").matches) {
				// 	console.log('现在是横屏模式。');
				// 	// 横屏模式下的处理逻辑
				// 	this.isHorizontal = true
				// 	if(this.isFirstH == 0){
				// 		this.isFirstH = 1
				// 	}
				// }
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.mask-hide {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: #000;
		z-index: 99999;
	
		.txt {
			display: inline-block;
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			margin-top: 20%;
		}
	}
</style>