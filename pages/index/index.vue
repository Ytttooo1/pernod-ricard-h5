<template>
	<view>{{openId}}</view>
</template>
<script>
import wx from 'weixin-js-sdk'
import wechatUtil from '@/util/wechat.js'
import Vconsole from 'vconsole'
export default {
	data() {
		return {
			openId: ""
		}
	},
	onLoad(option) {
		console.log('option:', option)
		new Vconsole();
		// wechatUtil.auth(option).then((res) => { 
		// 	this.openId = res;
		// })
    },
}
</script>

<style lang="scss" scoped>
</style>