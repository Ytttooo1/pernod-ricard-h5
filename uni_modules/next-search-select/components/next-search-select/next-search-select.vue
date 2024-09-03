<template>
	<view class="main" @touchmove.stop.prevent="">
		<view class="input" @click="showModal">
			<view class="input-block">
				<input v-model="_value" :style="disabled ? 'color:#c0c4cc' : ''" :placeholder="placeholder"
					placeholder-style="color: #c0c4cc;font-size: 32rpx;font-weight: none" disabled
					style="pointer-events: none" />
			</view>
			<!-- <view v-if="showArrow"><text style="font-size: 28rpx;align-items: center;" class="icon">&#xe615;</text></view> -->
		</view>
		<view class="select-modal" :class="isShowModal ? 'show' : ''" @tap="hideModal">
			<view class="select-dialog" @tap.stop :style="{ backgroundColor: bgColor }">
				<view class="title-main">
					<text class="title-detail">{{ title }}</text>
				</view>

				<view class="search-box" v-if="showSearch">
					<input class="search-input" confirm-type="search" v-model="searchInput" placeholder="输入内容进行模糊查询"
						placeholder-style="color:#c0c4cc;font-size: 32rpx;font-weight: none" />
					<text v-if="showSearchBtn" class="search-text" @click="handleSearch">
						搜索
					</text>
				</view>
				<scroll-view :scroll-y="true" class="select-content">
					<view class="select-item" v-for="(item, index) in list" :key="index" :id="`select-item-${index}`"
						:style="[getItemStyle(item)]" @click="select(item)">
						<view class="title-block">{{ getLabelKeyValue(item) }}</view>
						<text class="selectIcon icongou" v-if="valueIndexOf(item)"></text>
					</view>
					<view v-if="!list.length">
						<view v-if="customValue" class="select-item"  @click="select(searchInput)">
							<view class="title-block">{{ searchInput }}</view>
						</view>
						<view v-else class="no-data"><text>暂无数据！</text></view>
					</view>
				</scroll-view>
				<view class="select-bar bg-white" v-if="multiple">
					<button plain="true" class="mini-btn action" type="default" size="mini" @tap="empty">
						{{ emptyText }}
					</button>
					<button class="mini-btn action" type="primary" size="mini" :style="{backgroundColor: selectColor}"
						@tap="confirmClick">
						{{ confirmText }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import rightIconSrc from './right_icon.png';

	export default {
		name: 'NextSearchSelect',
		data() {
			return {
				isShowModal: false,
				searchInput: '',
				options: [],
				rightIconSrc,
				localChecklist: []
			}
		},
		props: {
			customValue:{
				type:Boolean,
				default:true
			},
			showSearch: {
				// 是否显示搜索框
				type: Boolean,
				default: true,
			},
			value: {
				type: [Number, String, Array, Object],
				default: null,
			},
			placeholder: {
				// 占位符
				default: '',
				type: String,
			},
			multiple: {
				// 是否多选
				default: false,
				type: Boolean,
			},
			list: {
				default: () => [],
				type: Array,
			},
			valueKey: {
				// 指定list中valueKey的值作为下拉框绑定内容
				default: 'value',
				type: String,
			},
			labelKey: {
				// 指定list中labelKey的值作为下拉框显示内容
				default: 'label',
				type: String,
			},
			// 指定list中labelKey的值作为下拉框disabled的属性
			disabledKey: {
				default: 'disabled',
				type: String,
			},
			disabled: {
				default: false,
				type: Boolean,
			},
			emptyText: {
				default: '重置',
				type: String,
			},
			title: {
				default: '选择内容',
				type: String,
			},
			confirmText: {
				default: '确定',
				type: String,
			},
			color: {
				default: '#000000',
				type: String,
			},
			selectColor: {
				default: '#2196f3',
				type: String,
			},
			bgColor: {
				default: '#ffffff',
				type: String,
			},
			selectBgColor: {
				default: '#FFFFFF',
				type: String,
			},
			showSearchBtn: {
				default: true,
				type: Boolean, // single || all
			},
			showArrow: {
				type: Boolean,
				default: true,
			},
		},
		emits: ['openDeepScroll', 'closeDeepScroll'],
		computed: {
			_value: {
				get() {
					return this.get_value(this.value)
				},
				set(val) {
					this.$emit('input', val)
				},
			}
		},
		created() {
			this.$watch(() => this.searchInput, (val) => {
				if (!this.showSearchBtn) this.$emit('search', val)
			})
		},
		methods: {
			handleSearch() {
				this.$emit('search', this.searchInput)
			},
			getItemStyle(item) {
				const disabledColor = this.disabledKey && item[this.disabledKey] === true ? '#dedede' : ''
				const color = disabledColor ? disabledColor : this.valueIndexOf(item) ? this.selectColor : this.color
				const backgroundColor = this.valueIndexOf(item) ? this.selectBgColor : undefined
				return {
					color,
					backgroundColor
				}
			},
			get_value(val) {
				// 将数组值转换为以,隔开的字符串
				if (val || val === 0) {
					if (Array.isArray(val)) {
						let chooseAttr = []
						val.forEach((item) => {
							const list = this.options.concat(this.list)
							let choose = list.find((temp) => {
								let val_val = this.getValueKeyValue(temp)
								return item === val_val
							})
							let chooseLocal = this.localChecklist.find((temp) => {
								let val_val = this.getValueKeyValue(temp)
								return item === val_val
							})
							// 判断是否存在
							if (choose) {
								chooseAttr.push(choose)
								const bool = this.localChecklist.some((temp) => {
									return this.getValueKeyValue(choose) === this.getValueKeyValue(temp)
								})
								if (!bool) {
									this.localChecklist.push(choose)
								}
							} else if (chooseLocal) {
								chooseAttr.push(chooseLocal)
							}
						})
						let values = ''
						if (chooseAttr.length > 0) {
							values = chooseAttr
								.map((temp) => this.getLabelKeyValue(temp))
								.join(',')
						}

						return values
					} else {
						let choose = this.list.find((temp) => {
							let val_val = this.getValueKeyValue(temp)
							return val === val_val
						})
						if (choose) {
							return this.getLabelKeyValue(choose)
						} else {
							return val
						}
					}
				} else {
					return ''
				}
			},
			select(item) {
				// 点击选项
				if (this.disabledKey && item[this.disabledKey] === true) return
				let val = this.getValueKeyValue(item)
				if (this.multiple) {
					const o = this.localChecklist.find(it => it[this.valueKey] === item[this.valueKey])
					if (!o) {
						this.localChecklist.push(item)
					}
					let _value = this.value
					let index = _value ? _value.indexOf(val) : -1
					if (index != -1) {
						_value.splice(index, 1)
						this.options.splice(index, 1)
						// this.$emit('input', _value)
					} else {
						_value.push(val)
						this.options.push(item)
						// this.$emit('input', _value)
					}

					// #ifdef VUE2
					this.$emit('input', _value)
					// #endif
					// #ifdef VUE3
					this.$emit('update:value', _value)
					// #endif

					this.$emit('change', item)
				} else {
					let label = this.getLabelKeyValue(item)
					let emitValue = ''
					if (this._value) {
						if (label.indexOf(this._value) !== -1) {
							emitValue = ''
						} else {
							emitValue = val
						}
					} else {
						emitValue = val
					}
					
					if(!emitValue) {
						emitValue = this.searchInput;
					}

					// #ifdef VUE2
					this.$emit('input', emitValue)
					// #endif
					// #ifdef VUE3
					this.$emit('update:value', emitValue)
					// #endif

					// 单选选中的当前项所有
					this.$emit('change', item)
					this.hideModal()
				}
			},
			valueIndexOf(item) {
				let val = this.getValueKeyValue(item)
				if (Array.isArray(this.value)) {
					return this.value.indexOf(val) != -1
				} else {
					return this.value === val
				}
			},
			getLabelKeyValue(item) {
				// 获取label
				return item[this.labelKey] || '--'
			},
			getValueKeyValue(item) {
				// 获取value
				return item[this.valueKey]
			},
			empty() {
				// 清空
				if (this.multiple) {
					this.$emit('change', [])
					// #ifdef VUE2
					this.$emit('input', [])
					// #endif
					// #ifdef VUE3
					this.$emit('update:value', [])
					// #endif
				} else {
					this.$emit('change', '')
					// #ifdef VUE2
					this.$emit('input', '')
					// #endif
					// #ifdef VUE3
					this.$emit('update:value', '')
					// #endif
				}
			},
			confirmClick() {
				// 点击确定
				this.$emit('confirm', this._value)
				this.hideModal()
			},
			showModal() {
				// 显示model
				if (!this.disabled) {
					this.isShowModal = true
					// 打开禁止穿透滚动
					this.$emit('openDeepScroll')
					this.$emit('visibleChange', true)
				}
			},
			hideModal() {
				// 隐藏model
				this.isShowModal = false
				// 关闭禁止穿透滚动
				this.$emit('closeDeepScroll')
				this.$emit('visibleChange', false)
			},
		}
	}
</script>
<style lang="scss" scoped>
	@font-face {
		font-family: 'iconfont';
		src: url('//at.alicdn.com/t/c/font_4110624_3hfahswu4mf.ttf?t=1695353456719') format('truetype');
	}

	.icon {
		font-family: iconfont;
		font-size: 32upx;
		font-style: normal;
		color: #999;
	}

	.title-main {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.title-detail {
		display: flex;
		width: 88%;
		justify-content: center;
		padding: 30rpx 0;
	}

	.selectIcon {
		font-family: 'iconfont' !important;
		font-size: 18px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icongou:before {
		content: '\e6cf';
	}
</style>
<style lang="scss" scoped>
	.main {
		font-size: 32rpx;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.input {
		display: flex;
		align-items: center;

		.input-block {
			flex: 1;

			input {
				flex: 1;
				text-align: left;
				color: #333333;
			}
		}

	}

	.select-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000rpx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
		margin-bottom: -1000rpx;

		&::before {
			content: '\200B';
			display: inline-block;
			height: 100%;
			vertical-align: bottom;
		}

		.select-dialog {
			position: absolute;
			left: 0;
			bottom: 0;
			display: inline-block;
			margin-left: auto;
			margin-right: auto;
			background-color: #f8f8f8;
			overflow: hidden;
			width: 100%;
			border-radius: 0;

			.select-content {
				// background-color: #F1F1F1;
				height: 50vh;
				overflow-y: auto;
				overflow-x: hidden;
				box-sizing: border-box;

				.select-item {
					text-align: left;
					padding: 20rpx 40rpx;
					display: flex;
					position: relative;

					::after {
						position: absolute;
						right: 0;
						bottom: 0;
						content: '';
						width: 100%;
						height: 1px;
						display: block;
						margin: 0 auto;
						border-bottom: 1px solid #f5f2f2;
					}

					.title-block {
						flex: 1;
					}
				}
			}

			.no-data {
				text-align: center;
				padding: 30rpx;
				color: #cccccc;
			}
		}
	}

	.select-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
		margin-bottom: 0;
	}

	.select-bar {
		padding: 0 80rpx;
		display: flex;
		position: relative;
		align-items: center;
		min-height: 80rpx;
		justify-content: space-between;
		margin: 25rpx 0;

		.action {
			display: flex;
			align-items: center;
			height: 78rpx;
			justify-content: center;
			max-width: 100%;
			padding: 0 100rpx;
		}
	}

	.search-box {
		display: flex;
		margin: 10rpx 0;
		align-items: center;
		padding: 10rpx 40rpx;
	}

	.search-input {
		display: flex;
		flex: 1;
		height: 67rpx;
		line-height: 67rpx;
		border-radius: 40rpx;
		background: #f5f2f2;
		justify-content: flex-start;
		text-align: left;
		padding: 0 30rpx;
	}

	.search-text {
		padding-left: 30rpx;
	}
</style>