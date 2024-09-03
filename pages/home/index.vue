<template>
    <view class="home-box box">
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
        <view class="home-streamer-1">
            <img :src="staticUrl + '/images/home/home-streamer-1.png'" alt="">
        </view>
        <view v-show="landscapeShow" class="landscape">
            <img :src="staticUrl + '/images/home/landscape.png'" alt="">
        </view>
        <view class="start-box">
            <img @click="handleStart" :src="staticUrl + '/images/home/start-btn.png'" alt="">
        </view>
        <view class="rule-box">
            <img @click="handleRule" :src="staticUrl + '/images/home/info-btn.png'" alt="">
        </view>
        <view class="home-streamer-2">
            <img :src="staticUrl + '/images/home/home-streamer-2.png'" alt="">
        </view>
        <u-mask :show="agreement.show">
            <view class="custom-popup agreement-popup">
                <view @click="agreement.show = false" class="close-btn">
                    <img :src="staticUrl + '/images/home/agreement-close-btn.png'" alt="">
                </view>
            </view>
        </u-mask>
        <u-mask :show="introductionShow">
            <view class="brief-introduction">
                <view class="custom-popup introduction-popup">
                    <view @click="introductionShow = false;" class="close-btn">
                        <img :src="staticUrl + '/images/home/agreement-close-btn.png'" alt="">
                    </view>
                    <scroll-view class="content" scroll-y="true" :scroll-top="scrollTop" @scroll="scroll">
                        <view v-html="briefIntroduction"></view>
                    </scroll-view>
                </view>
            </view>
        </u-mask>

        <mask-adaptive></mask-adaptive>
    </view>
</template>

<script>
import config from '@/api/config.js'
import wx from 'weixin-js-sdk'
import wechatUtil from '@/util/wechat.js'
import moment from 'moment'
export default {
    mounted() {
        this.$refs['music-main'].initMusic("/static/music/other.mp3")
        document.body.addEventListener('touchmove', this.eventListenerHandle, {
            passive: false
        });
    },
    destroyed() {
        document.body.removeEventListener('touchmove', this.eventListenerHandle, {
            passive: false
        })
    },
    onLoad(option) {
        this.option = option
    },
    onShow() {
        if (uni.getStorageSync('wxToken')) {
            this.init()
        } else {
            this.init()
            wechatUtil.register(this.option).then((res) => {
                this.openId = res;
            })
        }

        if (this.$refs['music-main']) {
            this.$refs['music-main'].start();
        }
    },
    onUnload() {
        this.$refs['music-main'].disconnect();
    },
    onHide() {
        this.$refs['music-main'].stop();
    },
    data() {
        return {
            openId: "",
            scrollTop: 1,
            oldScrollTop: 0,
            briefIntroduction: config.introduction,
            introductionShow: false,
            landscapeShow: false,
            agreement: {
                select: false,
                show: false
            },
        }
    },
    methods: {
        eventListenerHandle(e) {
            if (e._isScroller) return;
            e.preventDefault();
        },
        init() {
            this.agreement.select = uni.getStorageSync("agreement") || false;
            this.briefIntroduction = this.briefIntroduction.replace(/\n/g, "<br>")
            wechatUtil.shareHome()
        },
        handleStart() {
            this.landscapeShow = true
            setTimeout(() => {
                uni.redirectTo({
                    url: '/pages/training-camp/index'
                })
            }, 2000)
        },
        handleRule() {
            this.introductionShow = true;
            this.scrollTop = this.oldScrollTop
            this.$nextTick(function () {
                this.scrollTop = 0
            });
        },
        handleAgreementSelect() {
            this.agreement.select = !this.agreement.select
            uni.setStorageSync("agreement", this.agreement.select)
        },
        scroll: function (e) {
            this.oldScrollTop = e.detail.scrollTop
        },
    },
}
</script>

<style lang="scss" scoped>
.home-box {
    background-image: url($staticUrl + "/images/home/home-bg.gif");
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    zoom: 1;

    .music-main {
        position: absolute;
        top: 70rpx;
        right: 13rpx;
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
        left: 71rpx;
        top: 275rpx;

        img {
            width: 664rpx;
            height: 1001rpx;
            display: block;
        }
    }
}

.start-box {
    width: 100%;
    position: absolute;
    bottom: 274rpx;
    left: 0;
    text-align: center;

    img {
        width: 280rpx;
        animation: zoomInOut 1.5s infinite;
    }

    @keyframes zoomInOut {
        0%,
        100% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.1);
        }
    }
}

.rule-box {
    width: 100%;
    position: absolute;
    top: 650rpx;
    right: 0;
    text-align: right;

    img {
        width: 60rpx;
    }
}

.home-streamer-1 {
    position: absolute;
    top: 136rpx;
    left: 81rpx;

    img {
        width: 584rpx;
        height: 116rpx;
        display: block;
    }
}

.home-streamer-2 {
    position: absolute;
    bottom: 113rpx;
    left: 48rpx;

    img {
        width: 675rpx;
        height: 122rpx;
        display: block;
    }
}

.landscape {
    position: absolute;
    top: 550rpx;
    left: 50%;
    transform: translateX(-50%);
    animation: fadeOut 0.5s ease-in-out forwards;

    @keyframes fadeOut {
        from {
            /* 动画开始时 */
            opacity: 0;
            /* 不透明度为1（可见）*/
        }

        to {
            /* 动画结束时 */
            opacity: 1;
            /* 不透明度为0（透明）*/
        }
    }

    img {
        width: 281rpx;
        height: 241rpx;
        display: block;
    }
}

.custom-popup {
    width: 606rpx;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;

        img {
            width: 70rpx;
            height: 70rpx;
            display: block;
        }
    }
}

.introduction-popup {
    height: 850rpx;
    background-image: url($staticUrl + "/images/home/introductory-bg.png");

    .content {
        margin-top: 80rpx;
        padding: 8%;
        height: 650rpx;
        width: 520rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        font-family: "Source Han Sans CN Regular";

        view {
            padding-right: 18rpx;
        }
    }
}

.agreement-popup {
    height: 1139rpx;
    background-image: url($staticUrl + "/images/home/agreement-bg.png");
}
</style>