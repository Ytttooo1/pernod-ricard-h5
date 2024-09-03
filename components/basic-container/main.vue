<template>
    <view class="basic-box box">
        <view class="trabecula-top">
            <img :src="staticUrl + '/images/home/home-trabecula.png'" alt="">
        </view>
        <view class="trabecula-bottom">
            <img :src="staticUrl + '/images/home/home-trabecula.png'" alt="">
        </view>
        <view class="title">
            <img :src="staticUrl + '/images/home/home-title.png'" alt="">
        </view>
        <view class="main">
            <slot>

            </slot>
        </view>
    </view>
</template>

<script>
export default {
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.basic-box {
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
    .title {
        position: absolute;
        top: 130rpx;
        left: 71rpx;
        img {
            width: 614rpx;
            height: 950rpx;
            display: block;
        }
    }
    .main {
        width: 100%;
        position: absolute;
        top: 357rpx;
    }
}
</style>