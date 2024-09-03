<template>
    <view id="container" class="container-box">
        <music-main ref="music-main" class="music-main"></music-main>
        <view class="box-content" :class="{'rotate90':!isHorizontal}" :style="{'width':height,'height':width,'margin-top':marginTop,'margin-left':marginLeft}">
            <view class="box-top-banner">
            </view>
            <view class="box-bottom-banner">
            </view>
            {{progressList}}
            <view v-show="curPage == 1" class="page-1">
                <img class="img-guide" :src="`${staticUrl}/images/training-camp/img-guide.png`">
                <view class="btn-close" @click="onClosePage1()"></view>
            </view>
            <view v-show="curPage == 2" class="page-2">
                <img class="img-tit" :src="`${staticUrl}/images/training-camp/img-h-title.png`">
                <view class="box-card">
                    <view class="card card-1" @click="handleGoCourse(0)">
                        <view class="box-progress-container">
                            <view class="text">
                                体验进度
                            </view>
                            <view class="box-progress">
                                <view v-for="progress in 6" :class="['point',{'active':progress<=progressList[0]}]">
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="card card-2" @click="handleGoCourse(1)">
                        <view class="box-progress-container">
                            <view class="text">
                                体验进度
                            </view>
                            <view class="box-progress">
                                <view v-for="progress in 6" :class="['point',{'active':progress<=progressList[1]}]"></view>
                            </view>
                        </view>
                    </view>
                    <view class="card card-3" @click="handleGoCourse(2)">
                        <view class="box-progress-container">
                            <view class="text">
                                体验进度
                            </view>
                            <view class="box-progress">
                                <view v-for="progress in 7" :class="['point',{'active':progress<=progressList[2]}]"></view>
                            </view>
                        </view>
                    </view>
                </view>
                <img class="btn-go" @click="handleQuestion" :src="`${staticUrl}/images/training-camp/btn-straight-in.png`">
                <img :class="['btn-check',{'filter-gray':!isFinish}]" @click="handleCert" :src="`${staticUrl}/images/training-camp/btn-check.png`">
            </view>

            <view v-show="showToast" class="mask-toast fadeIn">
                {{msgTxt}}
            </view>
        </view>

        <view v-show="isHorizontal" class="mask-hide" :class="{'rotate90':!isHorizontal}" :style="{'width':height,'height':width,'margin-top':marginTop,'margin-left':marginLeft}">
            <text class="txt">请先关闭手机自动旋转功能</text>
        </view>
    </view>
</template>
<script>
import Config from "../../api/config.js";
const {
    activityCode
} = Config;
import wx from 'weixin-js-sdk'
import wechatUtil from '@/util/wechat.js'
import {
    getActivityInfo
} from "../../api/activity.js"
import {
    getLearningProcess
} from "../../api/training-camp.js"
import {
    getMember
} from '@/api/index.js'
export default {
    data() {
        return {
            openId: "",
            isHorizontal: false,
            width: "",
            height: "",
            marginTop: '',
            marginLeft: '',
            curPage: 1,
            progressList: [0, 0, 0],
            recordId: "",
            member: {},
            activityInfo: {},

            isFinish: false,
            showToast: false,
            msgTxt: ""
        }
    },
    onUnload() {
        this.$refs['music-main'].disconnect();
    },
    onShow() {
        if (this.$refs['music-main']) {
            this.$refs['music-main'].start();
        }
        let params = {
            activityCode: Config.activityCode,
            openId: uni.getStorageSync('openId')
        }
        getMember(params).then(res => {
            if (res.success) {
                this.member = res.data;
                // 未完成答题
                this.recordId = this.member.record.id;
                this.isFinish = this.recordId ? true : false;
            }
        })
    },
    onHide() {
        this.$refs['music-main'].stop();
    },
    onLoad(option) {
		wechatUtil.shareHome();
        this.openId = uni.getStorageSync("openId")
        if (!this.openId) {
            wechatUtil.auth(option).then((res) => {
                this.openId = res;
            })
        }

        if (uni.getStorageSync("dialog-main")) {
            this.curPage = 2
        } else {
            this.curPage = 1
            uni.setStorageSync("dialog-main", 1)
        }
        getActivityInfo({
            code: activityCode
        }).then(res => {
            if (res.success) {
                this.activityInfo = res.data
                if (this.activityInfo.sceneList && this.activityInfo.sceneList.length > 0) {
                    this.activityInfo.sceneList.forEach((item, index) => {
                        let dto = {
                            activitySceneId: item.id,
                            openId: this.openId,
                            activityCode: activityCode
                        }
                        getLearningProcess(dto).then(data => {
                            if (data.success) {
                                item.process = data.data.process
                                this.$set(this.progressList, index, data.data.process)
                            }
                        })
                    })
                }
            }
        })
        let params = {
            activityCode: Config.activityCode,
            openId: uni.getStorageSync('openId')
        }
        getMember(params).then(res => {
            if (res.success) {
                this.member = res.data;
                // 未完成答题
                this.recordId = this.member.record.id;
                this.isFinish = this.recordId ? true : false;
            }
        })

    },
    mounted() {
        this.loading = true

        this.$refs['music-main'].initMusic("/static/music/other.mp3")
        this.adaptive();
        window.addEventListener("resize", (event) => {
            this.adaptive()
        }, false);
		// window.addEventListener('orientationchange', (event) => {
		// 	this.adaptive()
		// }, false);
    },
    methods: {
		adaptive() {
			let width = document.documentElement.clientWidth
			let height = document.documentElement.clientHeight
			if (width < height) { //竖屏
				this.width = width + "px";
				this.height = height + "px";
				this.marginTop = -(width / 2) + "px";
				this.marginLeft = -(height / 2) + "px";
				this.isHorizontal = false
			} else { //横屏
				this.width = height + "px";
				this.height = width + "px";
				this.marginTop = -(height / 2) + "px";
				this.marginLeft = -(width / 2) + "px";
				this.isHorizontal = true
			}
			
			
			// if (window.matchMedia("(orientation: portrait)").matches) {
			// 	this.width = window.innerWidth + "px";
			// 	this.height = window.innerHeight + "px";
			// 	this.marginTop = -(window.innerWidth / 2) + "px";
			// 	this.marginLeft = -(window.innerHeight / 2) + "px";
			// 	this.isHorizontal = false
			// } else if (window.matchMedia("(orientation: landscape)").matches) {
			// 	console.log(444)
			// 	this.width = window.innerHeight + "px";
			// 	this.height = window.innerWidth + "px";
			// 	this.marginTop = -(window.innerHeight / 2) + "px";
			// 	this.marginLeft = -(window.innerWidth / 2) + "px";
			// 	this.isHorizontal = true
			// }
		},
        handleGoCourse(index) {
            if (this.activityInfo.sceneList && this.activityInfo.sceneList.length > 0) {
                uni.redirectTo({
                    url: `/pages/training-camp/course?index=${index}&activitySceneId=${this.activityInfo.sceneList[index].id}&openId=${this.openId}`
                });
            }
        },
        handleQuestion() {
            uni.redirectTo({
                url: "/pages/question/index"
            });
        },
        handleCert() {
            if (this.recordId && this.isFinish) {
                uni.redirectTo({
                    url: `/pages/question/result?isPass=1`
                });
            } else {
                this.msgTxt = "您未完成结营考核"
                this.showToast = true
                setTimeout(() => {
                    this.showToast = false
                }, 4000)
            }
        },
        onClosePage1() {
            this.curPage = 2
        }
    }
}
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
uni-page-head {
    display: none;
}

/* #endif */
.container-box {
    width: 100%;
    height: 100vh;
    position: relative;
}

.music-main {
    position: absolute;
    bottom: 30rpx;
    right: 70rpx;
    z-index: 999;
}

.box-content {
    position: absolute;
    left: 50%;
    top: 50%;
    background-image: url($staticUrl + "/images/training-camp/bg-horizontal.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    .box-top-banner {
        width: 100%;
        height: 23.5px;
        background-color: #000;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        background-image: url($staticUrl + "/images/training-camp/img-adv.png");
        background-size: auto 100%;
        background-repeat: repeat-x;
    }

    .box-bottom-banner {
        width: 100%;
        height: 23.5px;
        background-color: #000;
        position: absolute;
        left: 0;
        bottom: 0;
        overflow: hidden;
        background-image: url($staticUrl + "/images/training-camp/img-adv.png");
        background-size: auto 100%;
        background-repeat: repeat-x;
    }

    .page-1 {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        .img-guide {
            width: 1000rpx;
            height: 550rpx;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -275rpx 0 0 -500rpx;
        }

        .btn-close {
            width: 250rpx;
            height: 80rpx;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: 150rpx 0 0 -125rpx;
        }
    }

    .page-2 {
        .img-tit {
            width: 900rpx;
            position: absolute;
            left: 50%;
            top: 75rpx;
            margin-left: -450rpx;
        }

        .box-card {
            width: 100%;
            height: 500rpx;
            position: absolute;
            left: 0;
            top: 50%;
            margin: -250rpx 0 0 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card {
            width: 400rpx;
            height: 400rpx;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin: 0 20rpx;
            position: relative;
            .box-progress-container {
                width: 80%;
                height: 40rpx;
                border-radius: 36rpx;
                padding: 20rpx;
                box-sizing: border-box;
                background-color: rgba(62, 57, 57, 0.8);
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: absolute;
                bottom: 40rpx;
                left: 50%;
                transform: translateX(-50%);
                .text {
                    font-family: AlimamaShuHeiTi;
                    font-weight: 400;
                    font-size: 20rpx;
                    line-height: 20rpx;
                    color: #ffffff;
                }
            }
            @media (max-height: 620px) {
    	        .box-progress-container{
				    width: 87%;
			    }
		    }
            .box-progress {
                width: 170rpx;
                height: 30rpx;
                bottom: 30rpx;
                display: flex;
                justify-self: start;
                align-items: center;
                justify-content: space-around;
                .point {
                    width: 14rpx;
                    height: 14rpx;
                    border-radius: 50%;
                    background-color: #fff;
                    border: 2rpx solid #fff;
                    box-sizing: content-box;
                }

                .active {
                    width: 14rpx;
                    height: 14rpx;
                    border-radius: 50%;
                    background-color: #1087ce;
                    border: 2rpx solid #fff;
                    box-sizing: content-box;
                }
            }
        }

        .card-1 {
            background-image: url($staticUrl + "/images/training-camp/img-card-1.png");
        }

        .card-2 {
            background-image: url($staticUrl + "/images/training-camp/img-card-2.png");
						.box-progress-container{
							background-color: rgba(34,44,59,.8);
						}

            .box-progress {
                left: 185rpx;
            }
        }

        .card-3 {
            background-image: url($staticUrl + "/images/training-camp/img-card-3.png");
						.box-progress-container{
							width: 85%;
							background-color: rgba(37,16,7,.8);
						}
            .box-progress {
                left: 170rpx;
                width: 180rpx;

                .point {
                   // margin-right: 8rpx;
                }
            }
        }
         @media (max-height: 620px) {
            .card-3 {
                .box-progress-container{
				    width: 90%;
			    }
            }
		}

        .btn-go {
            width: 450rpx;
            height: 80rpx;
            position: absolute;
            left: 50%;
            bottom: 80rpx;
            margin-left: -500rpx;
        }

        .btn-check {
            width: 500rpx;
            height: 100rpx;
            position: absolute;
            left: 50%;
            bottom: 54rpx;
            margin-left: 20rpx;
        }
    }
}

.rotate90 {
    transform: rotate(90deg);
    transform-origin: center;
}

.mask-toast {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 50rpx;
    line-height: 50rpx;
    display: inline-block;
    font-size: 25rpx;
    color: #fff;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateX(-50%);
}

.mask-hide {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: #000;
    z-index: 999;

    .txt {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 30rpx;
        color: #fff;
        margin-top: 20%;
    }
}

.filter-gray {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
    opacity: 1; //通过改变透明度来调节灰色的程度
}

/* 定义一个淡入动画 */
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

/* 应用动画到元素上 */
.fadeIn {
    opacity: 0;
    /* 开始状态设置为不可见 */
    animation: fadeIn 3s ease-in-out forwards;
    /* 动画名称，持续时间，缓动函数，填充模式 */
}
</style>