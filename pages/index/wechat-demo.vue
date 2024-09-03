<template>
	<view class="container">
		<view>
			<button class="btn" @click="handleOpenId">获取用户信息</button>
			<view>获取结果：{{wxUser}}</view>
		</view>
		<view>
			<button class="btn" @click="handleRegister">注册会员信息</button>
			<view>注册结果：{{openId}}</view>
		</view>
		<view>
			<wx-open-subscribe :template="templateId" id="subscribe-btn" @success="handleSubscribeSuccess" @error="handleSubscribeError">
				<script type="text/wxtag-template" slot="style">
				    <style>
				      .subscribe-btn {
				        color: #fff;
						border: 0;
						margin: 0 auto;
						margin-top: 25px;
						padding: 20px;
						width:100%;
						display: block;
						border-radius: 5px;
				        background-color: #07c160;
				      }
				    </style>
				  </script>
				  <script type="text/wxtag-template">
				    <button class="subscribe-btn">
				      订阅消息          
				    </button>
				  </script>
			</wx-open-subscribe>
		</view>
	</view>

</template>
<script>
import wx from 'weixin-js-sdk'
import wechatUtil from '@/util/wechat.js'
import Vconsole from 'vconsole'
export default {
	data() {
		return {
			openId: "",
			wxUser: {},
			dbUser: {},
			scoped: "snsapi_userinfo", // 应用授权作用域: snsapi_base.仅授权openid  snsapi_userinfo.用户昵称、性别、所在地
			templateId:"7RPuikzK_0Ke7TM-swKy1eiM32gigQguiDgBGkqNXVc",
			option: {},
		}
	},
	onLoad(option) {
		console.log('option:', option)
		this.option = option;
		new Vconsole();
		console.log('初始化微信');
		wechatUtil.config();
		var that = this;
		wx.ready(function () { 
			// 注意：只有以下三种途径才能自定义分享（通过链接无法正常分享）
			// 1.公众号菜单访问后分享
			// 2.生成二维码，识别二维码后分享
			// 3.访问页面后添加到收藏，从微信收藏中进入后分享

			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
			console.log(`${that.staticUrl}/wechat/wechat-share-user.jpg`,3333333333333)
			wx.updateAppMessageShareData({ 
				title: '分享好友', // 分享标题
				desc: '分享好友分享好友分享好友', // 分享描述
				link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: `${that.staticUrl}/wechat/wechat-share-user.jpg`, // 分享图标
				success: function () {
					console.log("分享好友成功")
				}
			})

			// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
			wx.updateTimelineShareData({ 
				title: '分享朋友圈', // 分享标题
				link: window.location.href , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl:  `${that.staticUrl}/wechat/wechat-share-group.jpg`, // 分享图标
				success: function () {
					console.log("分享朋友圈成功")
				}
			})
		})
	},
	methods: {
		handleOpenId() { 
			wechatUtil.auth(this.option,this.scoped).then((res) => { 
				this.openId = res;

				if (this.scoped == "snsapi_userinfo") {
					this.wxUser = uni.getStorageSync("wxUser")
				 } else { 
					this.wxUser = uni.getStorageSync("wxToken")
				}
			})
		},
		handleRegister() {
			wechatUtil.register(this.option).then((res)=>{
				this.openId = res;
			})
		},
		handleSubscribeSuccess() {
			// 订阅成功
			console.log("订阅成功")
			const msgData = {
				"thing1":"设备A002",
				"character_string4":"A000002",
				"time2":"2022-02-25 09:40:15",
				"thing3":"备注拉"
			}
			const url = window.location.href;
			wechatUtil.send(this.templateId, msgData, url);
		},
		handleSubscribeError() { 
			// 订阅失败
			console.log("订阅失败")
		}
	}
}
</script>
<style lang="scss" scoped>
.container{
	padding: 0 5%;
	.btn{
		color: #fff;
		border: 0;
		margin: 0 auto;
		margin-top: 50rpx;
		padding: 10rpx;
		width:100%;
		font-size: 25rpx;
		background-color: #07c160;
	}
}
</style>