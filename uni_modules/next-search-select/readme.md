
## next-search-select --下拉多选，单选，搜索

> 遇到问题或有建议可以加入QQ群(<font color=#f00>455948571</font>)反馈  
> 如果觉得组件不错，<font color=#f00>给五星鼓励鼓励</font>咯！


## 使用

>[从uniapp插件市场导入](https://ext.dcloud.net.cn/plugin?name=next-search-select)

```html
<template>
	<view class="title"><text>1. 单选模式：</text></view>
	<view class="item">
		<next-search-select
			:multiple="false"
			:list="options"
			label-key="projectName"
			value-key="id"
			placeholder=" 请选择报备项目"
			title="选择报备项目"
			v-model:value="projectId"
			@search="searchFunc"
			@change="changeCallback"
			clearable
		></next-search-select>
	</view>
	<view class="title"><text>2. 多选模式：</text></view>
	<view class="item">
		<next-search-select
			:multiple="true"
			:list="options"
			label-key="projectName"
			value-key="id"
			placeholder=" 请选择报备项目"
			title="选择报备项目"
			v-model:value="projectIds"
			@search="searchFunc"
			@change="changeCallback"
			clearable
		></next-search-select>
	</view>
</template>
```

### vue3 + ts 使用

```ts
<script setup lang="ts">
import {ref, unref} from "vue"

const options = ref<any>([])
// 单选模式下绑定的值是字符串
const projectId = ref("")
// 多选模式值必须是数值类型
const projectIds = ref([])
let dataLength = 0

function searchFunc(val?) {
	console.log("搜索的关键字：", val)
	uni.showLoading({
		title: '请稍后...',
		icon: 'none'
	})
	// 模拟ajax请求
	setTimeout(() => {
		options.value = []
		dataLength = 0
		if (dataLength < 40) {
			for (let i = 0; i < 40; i++) {
				options.value.push({
					id: `id-${val ? val + '-' : ''}${dataLength + i}`,
					projectName: `项目item-${val ? val + '-' : ''}${dataLength + i}`,
					ohterKey: `test-${i}`,
					disabled: i%2 === 0
				})
			}
			dataLength = unref(options).length
		}
		uni.hideLoading()
	}, 1000)
	
}
function changeCallback(item) {
	console.log("选中的item：", item)
}
searchFunc()
</script>
<style lang="scss">
	.title {
		color: #f9ae3d;
		font-size: 30rpx;
		padding: 20rpx 10rpx;
		background-color: #333;
	}
	.item {
		padding: 10rpx 20rpx;
		border: 1rpx solid #ccc;
	}
</style>

```
### vue2 同样支持，在这里不再写demo

### 组件按需加载
如果不需要组件全局加载，而已把组件拷贝到项目的components目录下，单独引入进来使用即可达到按需加载的效果
### 预览

***

|                 						功能预览               				   			 					|   
| :--------------------------------------------------------------------------:|
| ![](https://lixueshiaa.github.io/webtest/www/static/next-search-select.gif) |


## 参数


### next-search-select Props

可选参数属性列表

|参数名				|说明																																																						|类型														|是否必填	|默认值			|可选值			|
|----				|----																																																							|----														|----			|----				|----				|
|showSearch			|是否显示搜索框																																																|Boolean												|否				|true				|false			|
|value			|v-model v-model:value 绑定值																																											|Number, String, Array, Object	|是				|""					|-					|
|placeholder			|搜索框placeholder																																														|String													|否				|""					|-					|
|multiple	|是否多选																																																						|Boolean												|否				|false			|true				|
|list			|	列表值																																																							|Array													|是				|[]					|-					|
|valueKey			|list列表绑定的value关键属性key																																									|String													|否				|value			|-					|
|labelKey			|list列表绑定的label(显示)关键属性key																																						|String													|否				|label			|-					|
|disabledKey	|list列表绑定的disabled(显示)关键属性key																																					|String													|否				|disabled		|-					|
|disabled|	disabled																																																					|Boolean												|否				|false			|true				|
|emptyText				|重置按钮文本text																																														|String													|否				|重置				|-			 		|
|title				|弹层标题																																																				|String													|否				|选择内容		|-					|
|confirmText				|确定按钮文本text																																													|String													|否				|确定				|-					|
|color				|文字颜色																																																				|String													|否				|#000000		|-					|
|selectColor				|激活颜色																																																	|String													|否				|#f9ae3d		|-					|
|bgColor				|弹层背景颜色																																																	|String													|否				|#ffffff		|-					|
|selectBgColor				|激活项背景颜色																																													|String													|否				|#ffffff		|-					|
|showSearchBtn				|是否显示搜索按钮																																												|Boolean												|否				|true				|false			|
|showArrow				|是否显示右指示箭头																																													|Boolean												|否				|true				|false			|


# Event 事件
|事件名	|说明									|类型	|回调参数	|
|----		|----									|----	|----			|
|confirm|点击确定触发事件			|emit	|-				|
|change|change								|emit	|-				|
|visibleChange|弹层改变触发		|emit	|-				|