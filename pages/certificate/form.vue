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

		<view class="box-form">
			<img class="img-tit" :src="staticUrl + '/images/certificate/img-tit.png'" alt="">
			<view class="item-box">
				<view class="item">
					<text class="label">姓(中文)</text>
					<view class="box-ipt ">
						<input v-model="form.cnFirstName" type="text" placeholder="" />
					</view>
				</view>
				<view class="item">
					<text class="label label-right">名(中文)</text>
					<view class="box-ipt">
						<input v-model="form.cnLastName" type="text" placeholder="" />
					</view>
				</view>
			</view>
			<view class="item">
				<text class="label">英文姓名</text>
				<view class="box-ipt long">
					<input v-model="form.enFirstName" type="text" placeholder="" />
					<text class="tips">*如遇多音字无法正确显示，可自行修改</text>
				</view>
			</view>
			<view class="item">
				<text class="label">国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;籍</text>
				<!-- <view class="box-select" @click="selCountryShow = true">
					{{form.country}} 
				</view> -->
				<view class="box-select">
					<next-search-select :multiple="false" :list="countryList" label-key="label" value-key="value"
						placeholder="" title="请选择国籍" v-model:value="form.country" @search="searchCountry" :customValue="false"
						clearable></next-search-select>
				</view>
			</view>
			<view class="item">
				<text class="label">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</text>
				<view class="box-ipt long">
					<input v-model="form.email" type="text" placeholder="" />
				</view>
			</view>
			<view class="item">
				<text class="label">学校/单位</text>
				<!-- <view class="box-select" @click="selOccupationShow = true">
					{{form.occupation}}
				</view> -->
				<view class="box-select">
					<next-search-select :multiple="false" :list="occupationList" label-key="label" value-key="value"
						placeholder="" title="请选择学校/单位" :showSearch="false" v-model:value="form.occupation"
						clearable></next-search-select>
				</view>
			</view>
			<view v-show="isSchool" class="item">
				<text class="label">学校名称</text>
				<!-- <view class="box-select" @click="selSchoolShow = true">
					{{form.school}}
				</view> -->
				<view class="box-select">
					<next-search-select :multiple="false" :list="schoolList" label-key="label" value-key="value"
						placeholder="" title="请选择学校" v-model:value="form.school" @search="searchSchool"
						clearable></next-search-select>
				</view>
			</view>

			<u-select v-model="selCountryShow" mode="single-column" :list="countryList"
				@confirm="confirmSelectCountry"></u-select>
			<u-select v-model="selOccupationShow" mode="single-column" :list="occupationList"
				@confirm="confirmSelectOccupation"></u-select>
			<u-select v-model="selSchoolShow" mode="single-column" :list="schoolList"
				@confirm="confirmSelectSchool"></u-select>
			<img class="btn-submit" @click="handleSubmit" :src="staticUrl + '/images/certificate/btn-submit.png'"
				alt="">
		</view>
		
		<mask-adaptive></mask-adaptive>
	</view>


</template>

<script>
	import Config from "../../api/config.js";
	const {
		activityCode
	} = Config;
	import countryData from '@/static/data/country-code.json';
	import wx from 'weixin-js-sdk'
	import wechatUtil from '@/util/wechat.js'
	import {
		getSchoolList,
		saveInfo
	} from "../../api/certificate.js"
	let pinyin = require('js-pinyin');
	pinyin.setOptions({
		checkPolyphone: true,
		charCase: 0
	});
	export default {
		data() {
			return {
				openId: "",
				timer: null,
				audioStatus: true,
				audioContext: null,
				countryList: [],
				rawCountryList: [],
				schoolList: [],
				rawSchoolList: [],
				redirect: "",
				occupationList: [{
						label: "高校在校学生",
						value: "高校在校学生"
					},
					{
						label: "高校职工",
						value: "高校职工"
					},
					{
						label: "企业员工",
						value: "企业员工"
					},
					{
						label: "政府工作人员",
						value: "政府工作人员"
					},
					{
						label: "非政府组织从业者",
						value: "非政府组织从业者"
					},
					{
						label: "其他",
						value: "其他"
					}
				],
				selCountry: [],
				selCountryShow: false,
				selOccupationShow: false,
				selSchoolShow: false,
				isSchool: false,
				form: {
					cnFirstName: "",
					cnLastName: "",
					country: "",
					email: "",
					enFirstName: "",
					occupation: "",
					school: ""
				},
			}
		},
		onLoad(option) {
			this.openId = uni.getStorageSync("openId")
			wechatUtil.shareHome();
			this.redirect = option.redirect ? decodeURIComponent(option.redirect) : "/pages/question/result?isPass=1";
			if (!this.openId) {
				wechatUtil.auth(option).then((res) => {
					this.openId = res;
				})
			}
		},
		onShow() {
			if (this.$refs['music-main']) {
				this.$refs['music-main'].start();
			}
		},
		onHide() {
			this.$refs['music-main'].stop();
		},
		onUnload() {
			this.$refs['music-main'].disconnect();
		},
		mounted() {
			countryData.forEach(e => {
				this.countryList.push({
					value: e.value,
					label: e.value == e.label ? e.label : `${e.value}/${e.label}`
				})
			})
			this.rawCountryList = this.countryList

			getSchoolList({
				keyword: ""
			}).then(res => {
				if (res.success) {
					let list = []
					res.data.forEach(e => {
						list.push({
							value: e,
							label: e
						})
					})
					this.schoolList = list
					this.rawSchoolList = list
					Object.freeze(this.schoolList);
				}
			})

			this.loading = true
			this.$refs['music-main'].initMusic("/static/music/other.mp3")
		},
		methods: {
			handleBackHome() {
				uni.redirectTo({
					url: `/pages/home/index`
				});
			},
			handlePlayAgain() {
				uni.redirectTo({
					url: `/pages/question/index`
				});
			},
			handleSubmit() {
				if (!this.form.enFirstName) {
					this.form.enFirstName = pinyin.getFullChars(this.form.cnFirstName) + " " + pinyin.getFullChars(this
						.form.cnLastName)
				}

				for (let key in this.form) {
					if (key == "school") {
						if (this.form.occupation == "高校在校学生") {
							if (!this.form[key]) {
								uni.showToast({
									title: "请填写完整信息",
									icon: "none"
								})
								return
							}
						}
					} else if (!this.form[key]) {
						uni.showToast({
							title: "请填写完整信息",
							icon: "none"
						})
						return
					}
				}

				if (!this.validateEmail(this.form.email)) {
					uni.showToast({
						title: "邮箱格式不规范",
						icon: "none"
					})
					return
				}

				this.form.openId = this.openId;
				this.form.activityCode = Config.activityCode;
				saveInfo(this.form).then(res => {
					if (res.success) {
						uni.redirectTo({
							url: this.redirect
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			},
			validateEmail(email) {
				var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				return emailRegex.test(email);
			},
			confirmSelectCountry(e) {
				if (e && e.length > 0) {
					this.form.country = e.value
				}
			},
			confirmSelectOccupation(e) {
				if (e && e.length > 0) {
					this.form.occupation = e[0].value
				}
			},
			confirmSelectSchool(e) {
				if (e && e.length > 0) {
					this.form.school = e[0].value
				}
			},
			searchCountry(val) {
				if (val) {
					let tempList = []
					this.rawCountryList.forEach(item => {
						if (item.label.indexOf(val) > -1) {
							tempList.push(item);
						}
					})
					this.countryList = tempList
				} else {
					this.countryList = this.rawCountryList
				}
			},
			searchSchool(val) {
				if (val) {
					let tempList = []
					this.rawSchoolList.forEach(item => {
						if (item.label.indexOf(val) > -1) {
							tempList.push(item);
						}
					})
					this.schoolList = tempList
				} else {
					this.schoolList = this.rawSchoolList
				}
			},
			checkPinyinName(cnFirstName, cnLastName, enName) {
				if (cnFirstName && cnLastName) {
					if (!enName) {
						return true;
					} else if (enName && enName.includes(" ")) {
						let enFirstName = enName.split(" ")[0];
						let enLastName = enName.split(" ")[1];
						if (pinyin.getFullChars(cnFirstName).includes(enFirstName) &&
							pinyin.getFullChars(cnLastName).includes(enLastName)
						) {
							return true;
						}
					}
				}
				return false;
			}
		},
		watch: {
			'form.occupation': {
				handler(occupation) {
					if (occupation && (occupation == "高校在校学生")) {
						this.isSchool = true
					} else {
						this.isSchool = false
						this.form.school = ""
					}
				}
			},
			'form.cnFirstName': {
				handler(cnFirstName) {
					if (this.checkPinyinName(cnFirstName, this.form.cnLastName, this.form.enFirstName)) {
						this.form.enFirstName = pinyin.getFullChars(cnFirstName) + " " + pinyin.getFullChars(this.form
							.cnLastName)
					}
				}
			},
			'form.cnLastName': {
				handler(cnLastName) {
					if (this.checkPinyinName(this.form.cnFirstName, cnLastName, this.form.enFirstName)) {
						this.form.enFirstName = pinyin.getFullChars(this.form.cnFirstName) + " " + pinyin.getFullChars(
							cnLastName)
					}
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

		.box-form {
			width: 640rpx;
			height: 830rpx;
			position: absolute;
			left: 55rpx;
			top: 420rpx;
			background-image: url($staticUrl + "/images/certificate/bg-box.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
			box-sizing: border-box;
			padding: 0 30rpx;
			.img-tit {
				width: 556rpx;
				height: 60rpx;
				margin: 30rpx 0 30rpx 15rpx;
			}

			.item-box {
				width: 100%;
				display: flex;

				.item {
					.label {
						width: 140rpx;
						line-height: 58rpx;
						font-size: 28rpx;
					}

					.label-right {
						display: inline-block;
						box-sizing: border-box;
						padding-right: 10rpx;
						text-align: right;
					}

					.box-ipt {
						width: 150rpx;
					}
				}
			}

			.item {
				width: 100%;
				display: flex;
				margin-bottom: 40rpx;

				.label {
					width: 140rpx;
					line-height: 58rpx;
					font-size: 28rpx;
					font-weight: bold;
					font-family: "Source Han Sans CN";
				}

				.box-ipt {
					height: 58rpx;
					line-height: 58rpx;
					box-sizing: border-box;
					padding: 0 10rpx;
					background-image: url($staticUrl + "/images/certificate/bg-input.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: relative;

					input {
						height: 58rpx;
						line-height: 58rpx;
						font-size: 28rpx;
					}

					.tips {
						color: red;
						font-size: 20rpx;
						position: absolute;
						top: 45rpx;

					}
				}

				.long {
					width: 450rpx;
					background-image: url($staticUrl + "/images/certificate/bg-input-long.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}

				.box-select {
					width: 450rpx;
					background-image: url($staticUrl + "/images/certificate/bg-select.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
					padding: 0 10rpx;
					height: 58rpx;
					line-height: 58rpx;

					::v-deep .input {
						height: 60rpx;
					}
					::v-deep .uni-input-input{
						font-size: 28rpx !important;
					}
				}
			}

			.btn-submit {
				position: absolute;
				left: 50%;
				bottom: 50rpx;
				width: 286rpx;
				margin-left: -143rpx;
			}
		}

		@media (max-height: 700px) {
    	.box-form{
				top: 370rpx;
				height: 830rpx;
			}
		}

	}
</style>