<template>
    <basic-container>
        <LuckyGrid ref="myLucky" width="200px" height="200px" :activeStyle="activeStyle" :prizes="prizes" :blocks="blocks" :buttons="buttons" @start="startCallback" @end="endCallback" />
        <u-button @click="startCallback" type="primary">点一下</u-button>
    </basic-container>
</template>

<script>
import LuckyGrid from '@lucky-canvas/uni/lucky-grid.vue'
let pinyin = require('js-pinyin');
pinyin.setOptions({ checkPolyphone: true, charCase: 0 });
// setOptions中传入对象，对象可传两个参数
// charCase参数： 输出拼音的大小写模式，0-首字母大写；1-全小写；2-全大写 
// checkPolyphone：是否检查多音字 pinyin.setOptions({checkPolyphone: false, charCase: 0});
import aaa from '@/static/data/country-code.json'
export default {
    mounted() {
        console.log(pinyin.getFullChars("黎海锋"));
    },
    components: { LuckyGrid },
    data() {
        return {
            blocks: [
                { padding: '10px', imgs: [{ src: this.staticUrl + '/images/draw/draw-bg.png', width: '200px' }] }
            ],
            prizes: [
                { x: 0, y: 0, imgs: [{ src: this.staticUrl + '/images/draw/grimace-icon.png', width: '60px' }] },
                { x: 1, y: 0, imgs: [{ src: this.staticUrl + '/images/draw/car-icon.png', width: '60px' }] },
                { x: 2, y: 0, imgs: [{ src: this.staticUrl + '/images/draw/sad-icon.png', width: '60px' }] },
                { x: 2, y: 1, imgs: [{ src: this.staticUrl + '/images/draw/music-icon.png', width: '60px' }] },
                { x: 2, y: 2, imgs: [{ src: this.staticUrl + '/images/draw/grimace-icon.png', width: '60px' }] },
                { x: 1, y: 2, imgs: [{ src: this.staticUrl + '/images/draw/player-icon.png', width: '60px' }] },
                { x: 0, y: 2, imgs: [{ src: this.staticUrl + '/images/draw/sad-icon.png', width: '60px' }] },
                { x: 0, y: 1, imgs: [{ src: this.staticUrl + '/images/draw/custom-car-icon.png', width: '60px' }] },
            ],
            buttons: [{
                x: 1, y: 1,
                imgs: [{ src: this.staticUrl + '/images/draw/draw-btn.png', width: '60px' }]
            }],
            activeStyle: {
                shadow: '0px 0px 40px yellow'
            }
        }
    },
    methods: {
        // 点击抽奖按钮会触发star回调
        startCallback() {
            // 调用抽奖组件的play方法开始游戏
            this.$refs.myLucky.play()
            // 模拟调用接口异步抽奖
            setTimeout(() => {
                // 假设后端返回的中奖索引是0
                const index = 0
                // 调用stop停止旋转并传递中奖索引
                this.$refs.myLucky.stop()
            }, 3000)
        },
        // 抽奖结束会触发end回调
        endCallback(prize) {
            console.log(prize)
        },
    }
}
</script>