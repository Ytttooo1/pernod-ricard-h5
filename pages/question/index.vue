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

		<view class="box-question">
			<text class="txt-left">答卷进度</text>
			<text class="txt-left-num">{{curNum<10?'0'+curNum:curNum}}/{{questionNum}}</text>
			<text class="txt-right">答对数量</text>
			<text class="txt-right-num">{{trueNum<10?'0'+trueNum:trueNum}}</text>
			<text class="txt-num">第{{curNum}}题</text>
			<text class="txt-question">{{curQuestion.title}}</text>
			<view class="box-item">
				<view v-for="(option,index) in curQuestion.optionList" class="item" @click="handleChoose(index)">
					<view class="item-img">
						<img class="img-checkbox" :src="staticUrl + '/images/question/img-checkbox.png'">
						<img v-if="curChoose == index" class="img-cancel"
							:src="staticUrl + '/images/question/img-cancel.png'">
					</view>
					<view class="item-txt">
						{{option.code}}.{{option.content}}
					</view>
				</view>
			</view>
			<view v-if="isConfirm" class="box-answer">
				<img class="img-bg" :src="staticUrl + '/images/question/bg-gray.png'">
				<text class="txt">正确答案：{{answer.code}}.{{answer.content}}</text>
			</view>
			<img class="btn-submit" :src="staticUrl + '/images/question/btn-submit.png'" @click="handleSubmit()">
			<img v-if="curNum<questionNum" :class="['btn-next',{'filter-gray':!isConfirm}]"
				:src="staticUrl + '/images/question/btn-next.png'" @click="handleNext()">
			<img v-else :class="['btn-result',{'filter-gray':!isConfirm}]"
				:src="staticUrl + '/images/question/btn-result.png'" @click="handleResult()">
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
		getQuestionList,
		submitQuestion
	} from "../../api/question.js"
	import wx from 'weixin-js-sdk'
	import wechatUtil from '@/util/wechat.js'
	import Vconsole from 'vconsole'
	export default {
		data() {
			return {
				openId: "",
				timer: null,
				questionNum: 0,
				curNum: 0,
				trueNum: 0,
				questionList: [],
				curQuestion: {},
				curChoose: -1,
				isConfirm: false,
				answer: {}
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
		onLoad(option) {
			this.openId = uni.getStorageSync("openId")
			wechatUtil.shareHome();
			if (!this.openId) {
				wechatUtil.auth(option).then((res) => {
					this.openId = res;
				})
			}
		},
		mounted() {
			this.loading = true
			this.$refs['music-main'].initMusic("/static/music/other.mp3")

			this._getQuestionList();
		},
		methods: {
			_getQuestionList() {
				let dto = {
					activityCode: activityCode,
					questionBankId: 1
				}
				getQuestionList(dto).then(res => {
					if (res.success) {
						this.questionList = res.data
						this.questionNum = this.questionList.length
						this.curQuestion = this.questionList[0]
						this.curNum = 1
						this.trueNum = 0
						this.curQuestion.optionList.forEach(item => {
							if (item.correct == 1) {
								this.answer = item
							}
						})
					}
				})
			},
			handleChoose(index) {
				if (!this.isConfirm) {
					this.curChoose = index
				}

			},
			handleSubmit() {
				if (this.curChoose > -1) {
					if (!this.isConfirm) {
						this.isConfirm = true
						let chooseId = this.curQuestion.optionList[this.curChoose].id
						this.questionList[this.curNum - 1].selected = chooseId
						if (chooseId == this.answer.id) { //判断是否正确
							this.trueNum += 1
						}
					} else {
						if (this.curNum >= this.questionNum) {
							uni.showToast({
								title: "请点击“查看结果”",
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "请点击“下一题”",
								icon: "none"
							})
						}
					}
				} else {
					uni.showToast({
						title: "请选择答案",
						icon: "none"
					})
				}
			},
			handleNext() {
				if (this.curChoose != -1) {
					if (this.isConfirm && this.curNum < this.questionNum) {
						this.isConfirm = false
						this.curChoose = -1
						this.curNum += 1

						this.curQuestion = this.questionList[this.curNum - 1]
						this.curQuestion.optionList.forEach(item => {
							if (item.correct == 1) {
								this.answer = item
							}
						})
					} else {
						uni.showToast({
							title: "请点击\"就选它了\"",
							icon: "none"
						})
					}
				} else {
					uni.showToast({
						title: "请点击“就选它了”,确认当前答案",
						icon: "none"
					})
				}
			},
			handleResult() {
				if (this.curChoose != -1) {
					if (this.isConfirm && this.curNum >= this.questionNum) {
						let titleList = []
						this.questionList.forEach(item => {
							titleList.push({
								selected: item.selected,
								titleId: item.id
							})
						})

						let dto = {
							openId: this.openId,
							activityCode: activityCode,
							titleList: titleList,
							sourceChannel: uni.getStorageSync("sourceChannel")
						}

						submitQuestion(dto).then(res => {
							var isPass = res.success ? 1 : 0;
							uni.redirectTo({
								url: `/pages/question/result?isPass=${isPass}`
							});
						})
					} else {
						uni.showToast({
							title: "请点击\"就选它了\"",
							icon: "none"
						})
					}
				} else {
					uni.showToast({
						title: "请选择答案",
						icon: "none"
					})
				}

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

		.box-question {
			width: 630rpx;
			height: 980rpx;
			margin: 380rpx 0 0 60rpx;
			background-image: url($staticUrl + "/images/question/bg-box.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: relative;

			.txt-left {
				font-size: 24rpx;
				position: absolute;
				left: 10rpx;
				top: 45rpx;
				color: #fff;
				font-family: "Source Han Sans CN";
			}

			.txt-left-num {
				font-size: 24rpx;
				position: absolute;
				left: 20rpx;
				top: 80rpx;
				color: #2484EB;
				font-family: "Source Han Sans CN";
			}

			.txt-right {
				font-size: 24rpx;
				position: absolute;
				right: 20rpx;
				top: 45rpx;
				color: #fff;
				font-family: "Source Han Sans CN";
			}

			.txt-right-num {
				font-size: 24rpx;
				position: absolute;
				right: 30rpx;
				top: 80rpx;
				color: #2484EB;
				font-family: "Source Han Sans CN";
			}

			.txt-num {
				width: 100%;
				display: inline-block;
				text-align: center;
				font-size: 40rpx;
				text-align: center;
				margin-top: 35rpx;
				font-weight: bold;
				font-family: "Alimamashuheiti";
			}

			.txt-question {
				width: 100%;
				display: inline-block;
				box-sizing: border-box;
				font-size: 30rpx;
				padding: 0 40rpx;
				margin-top: 60rpx;
				font-weight: bold;
				font-family: "Source Han Sans CN";
			}

			.box-item {
				width: 100%;
				margin-top: 30rpx;

				.item {
					width: 100%;
					min-height: 60rpx;
					box-sizing: border-box;
					padding: 0 30rpx 0 90rpx;
					position: relative;
					display: block;
					margin-bottom: 10rpx;

					.item-img {
						position: absolute;
						left: 40rpx;
						top: 0rpx;
						width: 100rpx;
						height: 100rpx;

						.img-checkbox {
							width: 38rpx;
							height: 38rpx;
							position: absolute;
							left: 0;
							top: 0;
						}

						.img-cancel {
							width: 55.5rpx;
							height: 47rpx;
							position: absolute;
							left: 0;
							top: -4rpx;
						}
					}

					.item-txt {
						width: 100%;
						display: block;
						font-size: 31rpx;
						white-space: pre-wrap;
						word-break: break-all;
						overflow-wrap: break-word;
						line-height: 38rpx;
						font-family: "Source Han Sans CN Regular";

					}
				}
			}

			.box-answer {
				width: 650rpx;
				height: 127rpx;
				position: absolute;
				left: -10rpx;
				bottom: 140rpx;

				.img-bg {
					width: 650rpx;
					height: 127rpx;
					position: absolute;
					left: 0rpx;
					bottom: 0rpx;
					mix-blend-mode: darken;
				}

				.txt {
					width: 605rpx;
					height: 127rpx;
					position: absolute;
					left: 0rpx;
					bottom: 0rpx;
					box-sizing: border-box;
					padding: 10rpx 30rpx;
					font-size: 31rpx;
					line-height: 50rpx !important;
					display: flex;
					align-items: right;
					justify-content: space-around;
					flex-direction: column;
					white-space: pre-wrap;
					word-break: break-all;
					overflow-wrap: break-word;
					font-family: "Source Han Sans CN Regular";
				}
			}

			.btn-submit {
				width: 262rpx;
				height: 80rpx;
				position: absolute;
				left: 30rpx;
				bottom: 40rpx;
			}

			.btn-next {
				width: 262rpx;
				height: 80rpx;
				position: absolute;
				right: 30rpx;
				bottom: 40rpx;
			}

			.btn-result {
				width: 262rpx;
				height: 75rpx;
				position: absolute;
				right: 30rpx;
				bottom: 40rpx;
			}
		}

	}
	@media (max-height: 700px) {
    .box-question{
			transform: scale(.8);
			margin-top: 280rpx !important;
			.box-answer{
				width: 620rpx !important;
				left: 0 !important;
				.img-bg{
					width: 100% !important;
				}
			}
		}
	}


	.filter-gray {
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		filter: grayscale(100%);
		filter: gray;
		opacity: 0.7; //通过改变透明度来调节灰色的程度
	}
</style>