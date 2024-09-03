<template>
    <view>
        <basic-container>
            <view class="draw-container">
                <LuckyGrid v-if="drawStyle.show" ref="myLucky" :width="drawStyle.width" :height="drawStyle.height" :activeStyle="activeStyle" :prizes="prizes" :blocks="blocks" :buttons="buttons" @start="startCallback" @end="endCallback" />
                <transition name="fade">
                    <view @click="onLongPress" class="text" v-if="giftId" v-html="text"></view>
                </transition>
                <view @click="handleReturn" class="return-btn"></view>
            </view>
        </basic-container>

        <music-main ref="music-main" class="music-main"></music-main>
        <mask-adaptive></mask-adaptive>
    </view>

</template>

<script>
import LuckyGrid from '@lucky-canvas/uni/lucky-grid.vue'
import {
    getMember,
    lottery,
    sendGiftMail
} from '@/api/index.js'
import config from '@/api/config.js'
import moment from 'moment'
import wechatUtil from '@/util/wechat.js'
export default {
    mounted() {
        this.$refs['music-main'].initMusic("/static/music/other.mp3")
        this.init()
        if (this.$store.state.windowHeight <= 700) {
            this.drawStyle.width = "250px"
            this.drawStyle.height = "250px"
            this.prizes.forEach((e) => {
                e.imgs[0].width = '76px'
            })
            this.buttons[0].imgs[0].width = '76px'
        }
        this.$nextTick(() => {
            this.drawStyle.show = true
        })
    },
    components: {
        LuckyGrid
    },
    data() {
        return {
            drawStyle: {
                show: false,
                width: '300px',
                height: '300px'
            },
            quotaCode: '',
            giftId: '',
            numList: [0, 2, 4, 6],
            giftList: [],
            userInfo: {},
            text: '',
            blocks: [{
                padding: '8px'
            }],
            prizes: [{
                x: 0,
                y: 0,
                imgs: [{
                    src: this.staticUrl + '/images/draw/grimace-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 1,
                y: 0,
                imgs: [{
                    src: this.staticUrl + '/images/draw/car-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 2,
                y: 0,
                imgs: [{
                    src: this.staticUrl + '/images/draw/sad-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 2,
                y: 1,
                imgs: [{
                    src: this.staticUrl + '/images/draw/music-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 2,
                y: 2,
                imgs: [{
                    src: this.staticUrl + '/images/draw/grimace-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 1,
                y: 2,
                imgs: [{
                    src: this.staticUrl + '/images/draw/player-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 0,
                y: 2,
                imgs: [{
                    src: this.staticUrl + '/images/draw/sad-icon.png',
                    width: '90px'
                }]
            },
            {
                x: 0,
                y: 1,
                imgs: [{
                    src: this.staticUrl + '/images/draw/custom-car-icon.png',
                    width: '90px'
                }]
            },
            ],
            buttons: [{
                x: 1,
                y: 1,
                imgs: [{
                    src: this.staticUrl + '/images/draw/draw-btn.png',
                    width: '90px'
                }]
            }],
            activeStyle: {
                background: '#EAC500',
                shadow: '0px 0px 20px #EAC500'
            }
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
    methods: {
        onLongPress() {
            if (this.giftId && this.giftId != 0 && this.quotaCode) {
                console.log(this.quotaCode, 666);
                uni.setClipboardData({
                    data: this.quotaCode,
                    success: () => {
                        uni.showToast({
                            title: '兑换码复制成功',
                            icon: 'none',
                            duration: 2000
                        });
                    },
                    fail: () => {
                        uni.showToast({
                            title: '兑换码复制失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                });
            }
        },
        handleReturn() {
            uni.redirectTo({
                url: '/pages/question/result?isPass=1'
            })
        },
        // 点击抽奖按钮会触发star回调
        startCallback() {
            if (this.userInfo.record.id) {
                let params = {
                    activityCode: config.activityCode,
                    openId: uni.getStorageSync('openId'),
                    recordId: this.userInfo.record.id,
                    sourceChannel: uni.getStorageSync("sourceChannel")
                }
                let func = () => {
                    lottery(params).then((res) => {
                        if (res.code == 200) {
                            this.$refs.myLucky.play()
                            let index = this.getLuckyIndex(res.data.giftId);
                            setTimeout(() => {
                                // 调用stop停止旋转并传递中奖索引
                                this.$refs.myLucky.stop(index)
                            }, 3000)
                        } else {
                            uni.showToast({
                                icon: "none",
                                title: res.msg
                            })
                        }
                    })
                }
                this.$u.throttle(func, 1000)
            } else {
                uni.showToast({
                    icon: "none",
                    title: '用户记录不存在'
                })
            }
        },
        getLuckyIndex(giftId) {
            let index = 0;
            if (giftId == 0) {
                let i = moment().valueOf() % 4
                index = this.numList[i]
            } else {
                if (giftId == 2) { //滴滴代驾券（10元）
                    index = 1
                } else if (giftId == 3) { //滴滴青桔（月卡）
                    index = 7
                } else if (giftId == 4) { //网易云音乐会员（1个月）
                    index = 3
                } else if (giftId == 5) { //腾讯视频会员（1个月）
                    index = 5
                }
            }
            return index;
        },
        // 抽奖结束会触发end回调
        endCallback(prize) {
            console.log(prize, '礼品')
            setTimeout(() => {
                this.init()
            }, 300);
        },
        init() {
            let params = {
                activityCode: config.activityCode,
                openId: uni.getStorageSync('openId')
            }
            getMember(params).then((res) => {
                this.userInfo = res.data
                let gift = this.userInfo ? this.userInfo.gift : {}
                this.giftId = gift.giftId ? `${gift.giftId}` : gift.giftId == 0 ? -1 : undefined
                this.quotaCode = gift.quotaCode
                if (this.giftId > 0) {
                    this.text =
                        `已抽中${gift.giftName}*1份!<br/>奖品兑换码【${gift.quotaCode}】<br/>立即复制券码前往对应APP兑换吧！`
                } else if (this.giftId == -1) {
                    this.text = "很遗憾未抽中奖品"
                }
            })
            wechatUtil.shareHome()
        }
    }
}
</script>

<style lang="scss" scoped>
.music-main {
    position: absolute;
    top: 70rpx;
    right: 13rpx;
}

.draw-container {
    width: 694rpx;
    height: 893rpx;
    background-image: url($staticUrl + "/images/draw/draw-bg.png");
    background-size: 100% 100%;
    margin: 0 auto;
    box-sizing: border-box;
    // padding: 36rpx 60rpx;
    // padding-right: 70rpx;
    padding-top: 20rpx;

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
		.fade-leave-to

		/* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }

    .text {
        width: 100%;
        height: 210rpx;
        font-family: Alimamashuheiti;
        font-weight: 400;
        font-size: 28rpx;
        line-height: 36rpx;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s;
        position: absolute;
        bottom: 110rpx;
        left: 0;
        -webkit-user-select: auto;
        /* Safari */
        -moz-user-select: auto;
        /* Firefox */
        -ms-user-select: auto;
        /* IE/Edge */
        user-select: auto;
        /* 标准语法 */
    }

    .return-btn {
        position: absolute;
        width: 90%;
        height: 100rpx;
        bottom: 40rpx;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media (max-height: 700px) {
    .draw-container {
        width: 620rpx;
        height: 793rpx;
        .text {
            height: 160rpx;
        }
    }
}
</style>