<script>
import music from './util/musicUtil.js'
import moment from 'moment'
export default {
    onLaunch: function () {
        this.$store.commit("setBrowser", this.browerType())
        uni.getSystemInfo({
            success: (res) => {
                this.$store.commit("setDevice", res.platform)
                this.$store.commit("setWindowSize", {
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight
                })
            }
        });
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    mounted() {

    },
    data() {
        return {
            oldPage: {}
        }
    },
    methods: {
        browerType() {
            var ua = navigator.userAgent.toLocaleLowerCase();
            // 判断是否为IE(第一个是正常的IE，第二个是Edge，第三个是IE11)
            var isIE = (ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1) || (ua.indexOf("edge") > -1) || (ua
                .indexOf(
                    'trident') > -1 && ua.indexOf("rv:11.0") > -1);
            // 判断是否为IE5678，!+[1,] 在IE5678返回true，在IE9、IE10、IE11返回false
            var isLteIE8 = isIE && !+[1,];
            // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
            var dm = document.documentMode,
                isIE5,
                isIE6,
                isIE7,
                isIE8,
                isIE9,
                isIE10,
                isIE11;
            if (dm) {
                isIE5 = dm === 5;
                isIE6 = dm === 6;
                isIE7 = dm === 7;
                isIE8 = dm === 8;
                isIE9 = dm === 9;
                isIE10 = dm === 10;
                isIE11 = dm === 11;
            } else {
                // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性  
                isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
                // 判断是否为IE6，IE7开始有XMLHttpRequest对象  
                isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
                // 判断是否为IE7，IE8开始有document.documentMode属性  
                isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
                // 判断是否IE8  
                isIE8 = isLteIE8 && document.documentMode;
                // 判断IE9，IE9严格模式中函数内部this不为undefined  
                isIE9 = !isLteIE8 && (function () {
                    "use strict";
                    return !!this;
                }());
                // 判断IE10，IE10开始支持严格模式，严格模式中函数内部this为undefined   
                isIE10 = isIE && !!document.attachEvent && (function () {
                    "use strict";
                    return !this;
                }());
                // 判断IE11，IE11开始移除了attachEvent属性  
                isIE11 = isIE && !document.attachEvent;
            };
            // 因为字符串存在覆盖重复原因，判断顺序不可随意修改
            if (isIE5) return 'IE5';
            if (isIE6) return 'IE6';
            if (isIE7) return 'IE7';
            if (isIE8) return 'IE8';
            if (isIE9) return 'IE9';
            if (isIE10) return 'IE10';
            if (isIE11) return 'IE11';
            if (ua.indexOf('micromessenger') > -1) return '微信浏览器';
            if (ua.indexOf('green') > -1) return '绿色浏览器';
            if (ua.indexOf('qq') > -1) return 'QQ浏览器';
            if (ua.indexOf('bidu') > -1) return '百度浏览器';
            if (ua.indexOf('lb') > -1) return '猎豹浏览器';
            if (ua.indexOf('world') > -1) return '世界之窗浏览器';
            if (ua.indexOf('2345') > -1) return '2345浏览器';
            if (ua.indexOf('maxthon') > -1) return '傲游浏览器';
            if (ua.indexOf('tao') > -1) return '淘宝浏览器';
            if (ua.indexOf('ubrowser') > -1) return 'UC浏览器';
            if (ua.indexOf('coolnovo') > -1) return '枫叶浏览器';
            if (ua.indexOf('opr') > -1) return 'opera浏览器';
            if (ua.indexOf('se') > -1) return '搜狗浏览器';
            if (ua.indexOf('firefox') > -1) return 'firefox浏览器';
            if (ua.indexOf('safari') > -1 && ua.indexOf("version") > -1) return ('safari浏览器');
            if (window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) return '360浏览器';
            if (ua.indexOf("chrome") > -1 && window.chrome) return ('chrome浏览器');
            return '其他浏览器';
        },
    },
    watch: {
        "$route": {
            immediate: true,
            deep: true,
            handler(newVal, oldVal) {
                return
                this.$nextTick(() => {
                    // oldVal 存在的话代表页面已经跳转过
                    if (oldVal) {
                        if (JSON.stringify(this.oldPage) != "{}") {
                            let stayTime = Number(Number((moment().valueOf() - this.oldPage.timestamp) / 1000).toFixed(0))
                            this.oldPage.stayTime = stayTime
                            this.$record.logPageSheet(this.oldPage)
                        }
                    }
                    let params = {
                        stayTime: 0,
                        timestamp: moment().valueOf(),
                        route: newVal
                    }
                    this.$record.logPageSheet(params)
                    this.oldPage = params
                })
            }
        }
    }
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";

/*每个页面公共css */
@font-face {
    font-family: "AlimamaShuHeiTi"; // 引入字体包，自己起的名字
    src: url($staticUrl + "/font/AlibabaSans-HeavyItalic.otf"); // 字体包本地路径
}

@font-face {
    font-family: "SmileySans";
    src: url($staticUrl + "/font/SmileySans-Oblique.ttf");
}

@font-face {
    font-family: "YouSheBiaoTiHei";
    src: url($staticUrl + "/font/YouSheBiaoTiHei.ttf");
}

@font-face {
    font-family: "Alimamashuheiti";
    src: url($staticUrl + "/font/Alimamashuheiti.ttf");
}

@font-face {
    font-family: "Source Han Sans CN";
    src: url($staticUrl + "/font/SourceHanSansCN-Bold.ttf");
}

@font-face {
    font-family: "Source Han Sans CN Regular";
    src: url($staticUrl + "/font/SourceHanSansCN-Regular.ttf");
}

page {
    width: 750rpx !important;
    margin: 0 auto;
    font-family: "Source Han Sans CN Regular";
}

.box {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    position: relative;
}

.trabecula-top {
    z-index: 999;
}

.trabecula-bottom {
    z-index: 999;
}

.authentication-popup {
    .u-drawer-content {
        overflow: initial !important;
    }

    .uni-scroll-view {
        overflow: initial !important;
    }
}

.custom-swiper {
    overflow: initial !important;

    .u-swiper-indicator {
        bottom: -40rpx !important;

        .u-indicator-item-round-active {
            width: 16px;
            background-color: #0e7255;
        }
    }
}
</style>