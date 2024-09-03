<template>
	<view class="container-box">
		<view v-if="moveClass" class="forbid-tier"></view>
		<view class="box-content" :class="{'rotate90':!isHorizontal}"
			:style="{'width':height,'height':width,'margin-top':marginTop,'margin-left':marginLeft}">
			<scroll-view :enable-flex="true" :class="['sv-content','sv-content-'+ (parseInt(curCourse )+ 1)]"
				:style="{'width':height,'height':width}" scroll-y="true" scroll-x="true" :scroll-top="scrollToLeft"
				:scroll-left="scrollToLeft">
				<view class="box-top-banner"></view>
				<view class="box-bottom-banner"></view>
				<view v-if="curCourse==0" :class="['box-course','box-course-1',moveClass]">
					<view v-show="moveClass==''" class="box-header fade">
						<img class="img-title" :src="`${staticUrl}/images/training-camp/img-page1-title.png`">
						<view class="box-progress">
							<view v-for="progress in 6" :class="['point',{'active':progress<=curProgress}]"></view>
						</view>
						<music-main ref="music-main" class="music-main" width="70" height="70"></music-main>
						<view class="return-btn" @click="handleReturn"></view>
					</view>
					<img :class="['img-point-1','flash1']" :src="`${staticUrl}/images/training-camp/img-point-1.png`"
						@click="handleStudy('1-1',1)">
					<img class="img-txt-1" :src="`${staticUrl}/images/training-camp/img-txt-1.png`"
						@click="handleStudy('1-1',1)">
					<img :class="['img-point-2','flash1']" :src="`${staticUrl}/images/training-camp/img-point-2.png`"
						@click="handleStudy('1-2',2)">
					<img class="img-txt-2" :src="`${staticUrl}/images/training-camp/img-txt-2.png`"
						@click="handleStudy('1-2',2)">
					<img :class="['img-point-3','flash1']" :src="`${staticUrl}/images/training-camp/img-point-3.png`"
						@click="handleStudy('1-3',3)">
					<img class="img-txt-3" :src="`${staticUrl}/images/training-camp/img-txt-3.png`"
						@click="handleStudy('1-3',3)">
					<img :class="['img-point-4','flash1']" :src="`${staticUrl}/images/training-camp/img-point-4.png`"
						@click="handleStudy('1-4',4)">
					<img class="img-txt-4" :src="`${staticUrl}/images/training-camp/img-txt-4.png`"
						@click="handleStudy('1-4',4)">
					<img :class="['img-point-5','flash1']" :src="`${staticUrl}/images/training-camp/img-point-5.png`"
						@click="handleStudy('1-5',5)">
					<img class="img-txt-5" :src="`${staticUrl}/images/training-camp/img-txt-5.png`"
						@click="handleStudy('1-5',5)">
					<img :class="['img-point-6','flash1']" :src="`${staticUrl}/images/training-camp/img-point-6.png`"
						@click="handleStudy('1-6',6)">
					<img class="img-txt-6" :src="`${staticUrl}/images/training-camp/img-txt-6.png`"
						@click="handleStudy('1-6',6)">
					<view v-if="moveClass==''" class="box-footer fade">
						<img id="btnGo" class="btn-go" :src="`${staticUrl}/images/training-camp/btn-go-1.png`"
							@click="handleGoQuestion()">
						<img class="btn-check" :src="`${staticUrl}/images/training-camp/btn-study.png`"
							@click="handleStudyMore()">
					</view>
				</view>
				<view v-if="curCourse==1" :class="['box-course','box-course-2',moveClass]">
					<view v-show="moveClass==''" class="box-header fade">
						<img class="img-title" :src="`${staticUrl}/images/training-camp/img-page2-title.png`">
						<view class="box-progress">
							<view v-for="progress in 6" :class="['point',{'active':progress<=curProgress}]"></view>
						</view>
						<music-main ref="music-main" class="music-main" width="70" height="70"></music-main>
						<view class="return-btn" @click="handleReturn"></view>
					</view>
					<img :class="['img-point-7','flash']" :src="`${staticUrl}/images/training-camp/img-point-7.png`"
						@click="handleStudy('2-1',7)">
					<img v-show="!show7" class="img-txt-7" :src="`${staticUrl}/images/training-camp/img-txt-7.png`"
						@click="handleStudy('2-1',7)">
					<img v-show="show7" class="img-txt-7-b"
						:src="`${staticUrl}/images/training-camp/pop2/img-pop-7.png`">
					<img :class="['img-point-8','flash']" :src="`${staticUrl}/images/training-camp/img-point-8.png`"
						@click="handleStudy('2-2',8)">
					<img class="img-txt-8" :src="`${staticUrl}/images/training-camp/img-txt-8.png`"
						@click="handleStudy('2-2',8)">
					<img :class="['img-point-9','flash']" :src="`${staticUrl}/images/training-camp/img-point-9.png`"
						@click="handleStudy('2-3',9)">
					<img class="img-txt-9" :src="`${staticUrl}/images/training-camp/img-txt-9.png`"
						@click="handleStudy('2-3',9)">
					<img :class="['img-point-10','flash']" :src="`${staticUrl}/images/training-camp/img-point-10.png`"
						@click="handleStudy('2-4',10)">
					<img v-show="!show10" class="img-txt-10" :src="`${staticUrl}/images/training-camp/img-txt-10.png`"
						@click="handleStudy('2-4',10)">
					<img v-show="show10" class="img-txt-10-b"
						:src="`${staticUrl}/images/training-camp/pop2/img-pop-10.png`">
					<img :class="['img-point-11','flash']" :src="`${staticUrl}/images/training-camp/img-point-11.png`"
						@click="handleStudy('2-5',11)">
					<img class="img-txt-11" :src="`${staticUrl}/images/training-camp/img-txt-11.png`"
						@click="handleStudy('2-5',11)">
					<img :class="['img-point-12','flash']" :src="`${staticUrl}/images/training-camp/img-point-12.png`"
						@click="handleStudy('2-6',12)">
					<img class="img-txt-12" :src="`${staticUrl}/images/training-camp/img-txt-12.png`"
						@click="handleStudy('2-6',12)">
					<view v-if="moveClass==''" class="box-footer fade">
						<img id="btnGo" class="btn-go" :src="`${staticUrl}/images/training-camp/btn-go-2.png`"
							@click="handleGoQuestion()">
						<img class="btn-check" :src="`${staticUrl}/images/training-camp/btn-study-2.png`"
							@click="handleStudyMore()">
					</view>
				</view>
				<view v-if="curCourse==2" :class="['box-course','box-course-3',moveClass]">
					<view v-show="moveClass==''" class="box-header fade">
						<img class="img-title" :src="`${staticUrl}/images/training-camp/img-page3-title.png`">
						<view class="box-progress">
							<view v-for="progress in 7" :class="['point',{'active':progress<=curProgress}]"></view>
						</view>
						<music-main ref="music-main" class="music-main" width="65" height="65"></music-main>
						<view class="return-btn" @click="handleReturn"></view>
					</view>
					<img :class="['img-point-13','flash']" :src="`${staticUrl}/images/training-camp/img-point-13.png`"
						@click="handleStudy('3-1',13)">
					<img class="img-txt-13" :src="`${staticUrl}/images/training-camp/img-txt-13.png`"
						@click="handleStudy('3-1',13)">
					<img :class="['img-point-14','flash']" :src="`${staticUrl}/images/training-camp/img-point-14.png`"
						@click="handleStudy('3-2',14)">
					<img v-show="!show14" class="img-txt-14" :src="`${staticUrl}/images/training-camp/img-txt-14.png`"
						@click="handleStudy('3-2',14)">
					<img v-show="show14" class="img-txt-14-b"
						:src="`${staticUrl}/images/training-camp/pop3/img-pop-14.png`" @click="handleStudy('3-2',14)">
					<img :class="['img-point-15','flash']" :src="`${staticUrl}/images/training-camp/img-point-15.png`">
					<img class="img-txt-15" :src="`${staticUrl}/images/training-camp/img-txt-15.png`"
						@click="handleStudy('3-3',15)">
					<img :class="['img-point-16','flash']" :src="`${staticUrl}/images/training-camp/img-point-16.png`"
						@click="handleStudy('3-4',16)">
					<img class="img-txt-16" :src="`${staticUrl}/images/training-camp/img-txt-16.png`"
						@click="handleStudy('3-4',16)">
					<img :class="['img-point-17','flash']" :src="`${staticUrl}/images/training-camp/img-point-17.png`"
						@click="handleStudy('3-5',17)">
					<img class="img-txt-17" :src="`${staticUrl}/images/training-camp/img-txt-17.png`"
						@click="handleStudy('3-5',17)">
					<img :class="['img-point-18','flash']" :src="`${staticUrl}/images/training-camp/img-point-18.png`"
						@click="handleStudy('3-6',18)">
					<img class="img-txt-18" :src="`${staticUrl}/images/training-camp/img-txt-18.png`"
						@click="handleStudy('3-6',18)">
					<img :class="['img-point-19','flash']" :src="`${staticUrl}/images/training-camp/img-point-19.png`"
						@click="handleStudy('3-7',19)">
					<img class="img-txt-19" :src="`${staticUrl}/images/training-camp/img-txt-19.png`"
						@click="handleStudy('3-7',19)">

					<view v-if="moveClass==''" class="box-footer fade">
						<img id="btnGo" class="btn-go" :src="`${staticUrl}/images/training-camp/btn-go-3.png`"
							@click="handleGoQuestion()">
						<img class="btn-check" :src="`${staticUrl}/images/training-camp/btn-study-3.png`"
							@click="handleStudyMore()">
					</view>
				</view>
				<view v-if="showDialog" class="box-dialog">
					<img class="img-dialog" :src="curDialogUrl">
					<view class="btn-close" @click="handleCloseDialog()"></view>
				</view>
				<view v-show="showHotPop" :class="['pop','pop-'+(parseInt(curCourse)+1),'pop-cur-'+curPopIndex] "
					:style="{'width':height,'height':width}">
					<img v-show="isPopAll" class="btn-close" @click="handleClosePop()"
						:src="`${staticUrl}/images/training-camp/btn-pop-close.png`">
					<view v-show="isPopBg" class="btn-close-hide" @click="handleClosePop()"></view>
					<img v-show="isPopBg&&curCourse == 0" class="bg-pop bg-pop-1"
						:src="`${staticUrl}/images/training-camp/pop1/bg-pop-1.png`">
					<img v-show="isPopBg&&curCourse == 1" class="bg-pop bg-pop-2"
						:src="`${staticUrl}/images/training-camp/pop2/bg-pop-2.png`">
					<img v-show="isPopBg&&curCourse == 2" class="bg-pop bg-pop-3"
						:src="`${staticUrl}/images/training-camp/pop3/bg-pop-3.png`">
					<scroll-view v-if="isPopBg" class="box-scroll" @scrolltolower="handleScrollEnd" scroll-y="true"
						scroll-x="true" :scroll-left="scrollTop" :scroll-top="scrollTop" @scroll="scroll">
						<img v-if="curPopIndex == 1" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop1/img-pop-1.png`">
						<img v-if="curPopIndex == 4" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop1/img-pop-4.png`">
						<img v-if="curPopIndex == 5" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop1/img-pop-5.png`">
						<img v-if="curPopIndex == 6" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop1/img-pop-6.png`">

						<img v-if="curPopIndex == 8" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop2/img-pop-8.png`">
						<img v-if="curPopIndex == 9" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop2/img-pop-9.png`">
						<img v-if="curPopIndex == 11" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop2/img-pop-11.png`">
						<img v-if="curPopIndex == 12" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop2/img-pop-12.png`">

						<img v-if="curPopIndex == 15" class="img-pop small-img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop3/img-pop-15.png`">
						<img v-if="curPopIndex == 18" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop3/img-pop-18.png`">
						<img v-if="curPopIndex == 19" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop3/img-pop-19.png`">
					</scroll-view>
					<view class="tips-scroll" v-if="isPopBg && !popEnd">&#9660;请向下滑动&#9660;</view>
					<scroll-view v-if="isPopAll && curPopIndex != 17" class="box-scroll-all" scroll-y="true"
						scroll-x="true" :scroll-left="scrollTop" :scroll-top="scrollTop" @scroll="scroll">
						<img v-if="curPopIndex == 2" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop1/img-pop-2.png`">
						<img v-if="curPopIndex == 13" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop3/img-pop-13.png`">
						<img v-if="curPopIndex == 16" class="img-pop" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop3/img-pop-16.png`">
					</scroll-view>
					<view v-if="isPopAll && curPopIndex == 3" class="box-scroll-all" scroll-y="true" scroll-x="true"
						:scroll-left="scrollTop" :scroll-top="scrollTop" @scroll="scroll">
						<img v-if="curPopIndex == 3" class="img-pop img-pop3" draggable="false"
							:src="`${staticUrl}/images/training-camp/pop1/img-pop-3.png`">
					</view>
					<view v-if="isPopAll && curPopIndex == 17" class="box-scroll-all" scroll-y="true" scroll-x="true"
						:scroll-left="scrollTop" :scroll-top="scrollTop" @scroll="scroll">
						<video v-if="curPopIndex == 17" ref="myVideo" class="cm-video"
							:src="`${staticUrl}/video/video.mp4`" :width="1000" :height="500" controls></video>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="isHorizontal" class="mask-hide" :class="{'rotate90':!isHorizontal}"
			:style="{'width':height,'height':width,'margin-top':marginTop,'margin-left':marginLeft}">
			<text class="txt">请先关闭手机自动旋转功能</text>
		</view>

	</view>
</template>
<script>
	import wechatUtil from '@/util/wechat.js'
	import Config from "../../api/config.js";
	import moment from 'moment'
	const {
		activityCode
	} = Config;
	import {
		getLearningProcess,
		getLearningSubmit
	} from "../../api/training-camp.js"
	export default {
		data() {
			return {
				playParams:{},
				timer: null,
				audioStatus: true,
				audioContext: null,
				popEnd: false, // 是否触底
				scrollTop: 1,
				oldScrollTop: 0,
				activitySceneId: "",
				openId: "",
				isHorizontal: false,
				width: "",
				height: "",
				marginTop: '',
				marginLeft: '',
				curCourse: 0,
				curProgress: 0,
				scrollToLeft: 0,
				showDialog: false,
				curDialogUrl: "",
				moveClass: "",
				showHotPop: false,
				curPopIndex: 0,
				isPopBg: false,
				isPopAll: false,
				show7: false,
				show10: false,
				show14: false,
				processList: [],
				musicList: ["/static/music/course_1.mp3",
					"/static/music/course_2.mp3",
					"/static/music/course_3.mp3"
				]
			}
		},
		onUnload() {
			this.$refs['music-main'].disconnect();
		},
		onShow() {
			if (this.$refs['music-main'] && this.curPopIndex!=17) {
				this.$refs['music-main'].start();
			}
		},
		onHide() {
			this.$refs['music-main'].stop();
		},
		onLoad(option) {
			this.curCourse = option.index
			this.curDialogUrl = `${this.staticUrl}/images/training-camp/img-dialog-${parseInt(this.curCourse)+1}.png`

			//第一次进入弹窗
			if (!uni.getStorageSync(`dialog-course${this.curCourse}`)) {
				this.showDialog = true
				uni.setStorageSync(`dialog-course${this.curCourse}`, 1)
			} else {
				this.showDialog = false
			}

			this.activitySceneId = option.activitySceneId
			//this.openId = option.openId
			wechatUtil.shareHome();
			this.openId = uni.getStorageSync("openId")
			if (!this.openId) {
				wechatUtil.auth(option).then((res) => {
					this.openId = res;
				})
			}

			if (option.activitySceneId) {
				let dto = {
					activitySceneId: option.activitySceneId,
					openId: option.openId,
					activityCode: activityCode
				}
				getLearningProcess(dto).then(data => {
					if (data.success) {
						this.curProgress = data.data.process
						this.processList = data.data.nameList
					}
				})
			}

			this.adaptive();
			window.addEventListener("resize", (event) => {
				this.adaptive()
			}, false);
			// window.addEventListener('orientationchange', (event) => {
			// 	this.adaptive()
			// }, false);
		},
		mounted() {
			this.$refs['music-main'].initMusic(this.musicList[this.curCourse])
			this.$nextTick(() => {
				this.scrollToLeft = ((window.innerWidth / 750) * 2760 - window.innerHeight) / 2
				console.log("this.curCourse", this.curCourse)
				if (this.curCourse == 0) {
					this.scrollToLeft = this.scrollToLeft + 35
				} else if (this.curCourse == 1) {
					this.scrollToLeft = this.scrollToLeft - 30
				} else if (this.curCourse == 2) {
					this.scrollToLeft = this.scrollToLeft - 70
				}
				console.log("this.scrollToLeft", this.scrollToLeft)
			})
		},
		watch: {
			showDialog(e) {
				if (!e) {
					this.moveClass = "move"
					document.body.addEventListener('touchmove', this.eventListenerHandle, {
            passive: false
        	});
					setTimeout(() => {
						this.moveClass = ""
						document.body.removeEventListener('touchmove', this.eventListenerHandle, {
            	passive: false
        		})
					}, 3000) // 需要与css的秒数相同
				}
			}
		},
		methods: {
			eventListenerHandle(e) {
          if (e._isScroller) return;
          e.preventDefault();
      },
			handleScrollEnd() {
				this.popEnd = true;
			},
			flashClass(item) {
				if (this.processList.includes(item)) {
					return "flash"
				} else {
					return "";
				}
			},
			scroll: function(e) {
				this.oldScrollTop = e.detail.scrollTop
			},
			handleReturn() {
				uni.redirectTo({
					url: '/pages/training-camp/index'
				})
			},
			handleMusic() {
				console.log("handleMusic")
			},
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
				
				
				// console.log(222,window.innerWidth,window.innerHeight)
				// if (window.innerWidth < window.innerHeight) { //竖屏
				// 	this.width = window.innerWidth + "px";
				// 	this.height = window.innerHeight + "px";
				// 	this.marginTop = -(window.innerWidth / 2) + "px";
				// 	this.marginLeft = -(window.innerHeight / 2) + "px";
				// 	this.isHorizontal = false
				// } else { //横屏
				// 	this.width = window.innerHeight + "px";
				// 	this.height = window.innerWidth + "px";
				// 	this.marginTop = -(window.innerHeight / 2) + "px";
				// 	this.marginLeft = -(window.innerWidth / 2) + "px";
				// 	this.isHorizontal = true
				// }

				// if (window.innerWidth < window.innerHeight) { //竖屏
				// 	this.width = window.innerWidth + "px";
				// 	this.height = window.innerHeight + "px";
				// 	this.marginTop = -(window.innerWidth / 2) + "px";
				// 	this.marginLeft = -(window.innerHeight / 2) + "px";
				// 	this.isHorizontal = false
				// } else { //横屏
				// 	this.width = window.innerHeight + "px";
				// 	this.height = window.innerWidth + "px";
				// 	this.marginTop = -(window.innerHeight / 2) + "px";
				// 	this.marginLeft = -(window.innerWidth / 2) + "px";
				// 	this.isHorizontal = true
				// }
				
				// if (window.matchMedia("(orientation: portrait)").matches) {
				// 	console.log('现在是竖屏模式。');
				// 	this.width = window.innerWidth + "px";
				// 	this.height = window.innerHeight + "px";
				// 	this.marginTop = -(window.innerWidth / 2) + "px";
				// 	this.marginLeft = -(window.innerHeight / 2) + "px";
				// 	this.isHorizontal = false
				// } else if (window.matchMedia("(orientation: landscape)").matches) {
				// 	console.log('现在是横屏模式。');
				// 	this.width = window.innerHeight + "px";
				// 	this.height = window.innerWidth + "px";
				// 	this.marginTop = -(window.innerHeight / 2) + "px";
				// 	this.marginLeft = -(window.innerWidth / 2) + "px";
				// 	this.isHorizontal = true
				// }
			},
			handleStudy(name, index) {
				let dto = {
					activitySceneId: this.activitySceneId,
					openId: this.openId,
					activityCode: activityCode,
					name: name
				}
				getLearningSubmit(dto).then(data => {
					if (data.success) {
						this.curProgress = data.data.process;
						this.processList = data.data.nameList
					}
				})

				// 重置弹窗滚动回到顶部
				this.scrollTop = this.oldScrollTop
				console.log(this.scrollTop)
				this.$nextTick(function() {
					this.scrollTop = 0
				});

				this.curPopIndex = index
				console.log(index, 2222222)
				if ([1, 4, 5, 6, 8, 9, 11, 12, 15, 18, 19].includes(index)) {
					this.popEnd = false;
					this.showHotPop = true
					this.isPopBg = true
					this.isPopAll = false
				}
				if (![5, 6, 11, 15, 18, 19].includes(index)) {
					this.popEnd = true;
				}
				console.log("this.popEnd", this.popEnd)

				if ([2, 3, 13, 16, 17].includes(index)) {
					this.showHotPop = true
					this.isPopBg = false
					this.isPopAll = true
					if (index == 17) {
						this.$refs['music-main'].stop()
						 let params = {
							stayTime: 0,
							route: this.$route,
							signName:"学习视频播放",
							timestamp: moment().valueOf(),
							type: 2
              }
							this.playParams = params
              this.$record.logPageSheet(params)
					}
				}

				if (index == 7) {
					this.show7 = true
				}

				if (index == 10) {
					this.show10 = true
				}

				if (index == 14) {
					this.show14 = true
				}

			},
			handleStudyMore() {
				uni.redirectTo({
					url: `/pages/training-camp/index`
				});
			},
			handleGoQuestion() {
				uni.redirectTo({
					url: `/pages/question/index`
				});
			},
			handleCloseDialog() {
				this.showDialog = false
			},
			handleClosePop() {
				this.showHotPop = false
				if (this.curPopIndex == 17) {
					this.$refs.myVideo.pause();
					this.$refs['music-main'].start()
					if (this.playParams.type) {
						let stayTime = Number(Number((moment().valueOf() - this.playParams.timestamp) / 1000).toFixed(0))
						this.playParams.stayTime = stayTime
            this.$record.logPageSheet(this.playParams)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tips-scroll {
		color: #fff;
		position: absolute;
		left: 50%;
		margin-left: -90rpx;
		bottom: 100rpx;
		font-size: 24rpx;
	}

	.fade {
		animation: fadeOut 0.3s ease-in-out forwards;
	}

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

	.move {
		animation: 3s move linear infinite normal;
	}

	.container-box {
		width: 100%;
		height: 100vh;
		position: relative;
		.forbid-tier{
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 999999999;
		}

		.box-top-banner {
			width: 100%;
			height: 20px;
			background-color: #000;
			position: fixed;
			left: 0;
			top: 0;
			overflow: hidden;
			background-image: url($staticUrl + "/images/training-camp/img-adv.png");
			background-size: auto 100%;
			background-repeat: repeat-x;
			z-index: 99;
		}

		.box-bottom-banner {
			width: 100%;
			height: 20px;
			background-color: #000;
			position: fixed;
			left: 0;
			bottom: 0;
			overflow: hidden;
			background-image: url($staticUrl + "/images/training-camp/img-adv.png");
			background-size: auto 100%;
			background-repeat: repeat-x;
			z-index: 99;
		}
	}

	.box-content {
		position: absolute;
		left: 50%;
		top: 50%;

		.sv-content {
			white-space: nowrap;
			overflow-y: auto;

			::-webkit-scrollbar {
				display: none;
				/* 隐藏滚动条 */
				width: 0;
				height: 0;
				-webkit-appearance: none;
				background: transparent;
				color: transparent;
			}

			.box-dialog {
				width: 2760rpx;
				height: 100%;
				background-color: rgba(0, 0, 0, .7);
				position: absolute;
				left: 0;
				top: 0;
				z-index: 88;

				.img-dialog {
					width: 1000rpx;
					height: 540rpx;
					position: absolute;
					left: 50%;
					top: 100rpx;
					margin-left: -500rpx;
				}

				.btn-close {
					width: 250rpx;
					height: 80rpx;
					position: absolute;
					left: 50%;
					top: 490rpx;
					margin-left: -125rpx;
				}
			}

			.pop {
				position: fixed;
				left: 0;
				top: 0;
				background-color: rgba(0, 0, 0, .7);
				z-index: 100;

				::-webkit-scrollbar {
					/* 滚动条整体样式 */
					display: block;
					width: 10rpx !important;
					height: 10rpx !important;
					-webkit-appearance: auto !important;
					background: transparent;
					overflow: auto !important;
				}

				::-webkit-scrollbar-track {
					/* 滚动条 */
					border-radius: 10rpx !important;
					box-shadow: inset 0 0 5rpx rgba(0, 0, 0, 0.2) !important;
					background-color: #ededed !important;
				}

				::-webkit-scrollbar-thumb {
					/* 滚动条里面小方块 */
					background: rgba(0, 168, 255, 1) !important;
				}


				.btn-close {
					position: absolute;
					left: 50%;
					top: 38rpx;
					z-index: 199;
					width: 70rpx;
					height: 70rpx;
					margin-left: 360rpx;
					z-index: 9999;
				}

				.btn-close-hide {
					position: absolute;
					left: 48%;
					top: 50rpx;
					z-index: 199;
					width: 90rpx;
					height: 90rpx;
					margin-left: 450rpx;
				}

				.bg-pop {
					width: 1150rpx;
					height: 650rpx;
					position: absolute;
					left: 50%;
					top: 60rpx;
					margin-left: -575rpx;
				}

				.bg-pop-2 {
					width: 1320rpx;
					height: 650rpx;
					position: absolute;
					left: 50%;
					top: 60rpx;
					margin-left: -675rpx;
				}

				.bg-pop-3 {
					width: 1100rpx;
					height: auto;
					position: absolute;
					left: 50%;
					top: 90rpx;
					margin-left: -550rpx;
				}

				.box-scroll {
					width: 850rpx;
					height: 450rpx;
					line-height: 450rpx;
					position: absolute;
					left: 50%;
					top: 110rpx;
					z-index: 10;
					margin-left: -450rpx;
					padding: 0 20rpx;

					.img-pop {
						width: 92%;
						margin-left: 5%;
						padding: 3% 0 5% 0;
						display: inline-block;
						vertical-align: middle;
					}
				}

				.box-scroll-all {
					width: 850rpx;
					height: 600rpx;
					line-height: 600rpx;
					position: absolute;
					left: 50%;
					top: 70rpx;
					z-index: 10;
					margin-left: -450rpx;

					.img-pop {
						width: 100%;
						display: inline-block;
						vertical-align: middle;
					}

					.cm-video {
						width: 850rpx;
						height: 600rpx;
					}

					.img-pop3 {

						width: 125%;
						display: inline-block;
						margin-left: -80rpx;
					}
				}

			}

			.pop-3 {
				.btn-close-hide {
					margin-left: 420rpx;
				}

				.box-scroll {
					width: 890rpx;
					height: 380rpx;
					top: 150rpx;

					.img-pop {
						margin-left: 10%;
						width: 85%;
					}
				}
			}

			.pop-cur-3 .btn-close {
				left: 50%;
				right: 180rpx;
				margin-left: 400rpx;
				top: 90rpx;
				width: 70rpx;
				height: 70rpx;
			}

			.pop-cur-17 .btn-close {
				left: 50%;
				margin-left: 420rpx;
				top: 85rpx;
				width: 70rpx;
				height: 70rpx;
				z-index: 9999;
			}

			@keyframes move {
				0% {
					transform: translateX(0rpx);
				}

				25% {
					transform: translateX(-200rpx);
				}

				50% {
					transform: translateX(0rpx);
				}

				75% {
					transform: translateX(200rpx);
				}

				100% {
					transform: translateX(-70rpx);
				}
			}

			.box-course-1 {
				background-image: url($staticUrl + "/images/training-camp/bg-long-1.jpg");
			}

			.box-course-2 {
				background-image: url($staticUrl + "/images/training-camp/bg-long-2.jpg");
			}

			.box-course-3 {
				background-image: url($staticUrl + "/images/training-camp/bg-long-3.jpg");
			}

			.box-course {
				width: 2760rpx;
				height: 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				position: relative;


				.box-header {
					position: fixed;
					top: 70rpx;
					left: 50%;
					transform: translateX(-50%);
					z-index: 10;

					.img-title {
						width: 820rpx;
					}

					.return-btn {
						position: absolute;
						width: 80rpx;
						height: 80rpx;
						top: 8px;
						left: 0rpx;
						z-index: 100;
					}

					.music-main {
						position: absolute;
						left: 750rpx;
						top: 26rpx;
						z-index: 9;
					}

					.box-progress {
						width: 160rpx;
						height: 30rpx;
						position: absolute;
						left: 390rpx;
						top: 115rpx;
						display: flex;
						justify-self: start;

						.point {
							width: 16rpx;
							height: 16rpx;
							border-radius: 50%;
							background-color: #fff;
							margin-right: 8rpx;
						}

						.active {
							width: 16rpx;
							height: 16rpx;
							border-radius: 50%;
							background-color: #1087CE;
							margin-right: 8rpx;
							border: 2rpx solid #fff;
						}
					}
				}

				.box-footer {
					position: fixed;
					bottom: 0rpx;
					left: 50%;
					transform: translateX(-50%);
					z-index: 10;

					.btn-go {
						width: 427rpx;
						height: 80rpx;
						position: absolute;
						left: 50%;
						bottom: 50rpx;
						margin-left: -440rpx;
					}

					.btn-check {
						width: 423rpx;
						height: 80rpx;
						position: absolute;
						left: 50%;
						bottom: 50rpx;
						margin-left: 10rpx;
					}
				}

				.img-point-1 {
					width: 208rpx;
					height: 80rpx;
					position: absolute;
					left: 350rpx;
					top: 380rpx;
				}

				.img-txt-1 {
					width: 350rpx;
					height: 64rpx;
					position: absolute;
					left: 480rpx;
					top: 400rpx;
				}

				.img-point-2 {
					width: 156rpx;
					height: 340rpx;
					position: absolute;
					left: 70rpx;
					top: 144rpx;
				}

				.img-txt-2 {
					width: 172rpx;
					height: 72rpx;
					position: absolute;
					left: 85rpx;
					top: 144rpx;
				}

				.img-point-3 {
					width: 280rpx;
					height: 150rpx;
					position: absolute;
					left: 320rpx;
					top: 190rpx;
				}

				.img-txt-3 {
					width: 378rpx;
					height: 45rpx;
					position: absolute;
					left: 330rpx;
					top: 300rpx;
				}

				.img-point-4 {
					width: 210rpx;
					height: 120rpx;
					position: absolute;
					left: 650rpx;
					top: 170rpx;
				}

				.img-txt-4 {
					width: 140rpx;
					height: 63rpx;
					position: absolute;
					left: 800rpx;
					top: 170rpx;
				}

				.img-point-5 {
					width: 80rpx;
					height: 126rpx;
					position: absolute;
					left: 1020rpx;
					top: 340rpx;
				}

				.img-txt-5 {
					width: 287rpx;
					height: 73rpx;
					position: absolute;
					left: 1030rpx;
					top: 340rpx;
				}

				.img-point-6 {
					width: 150rpx;
					position: absolute;
					left: 1820rpx;
					top: 130rpx;
				}

				.img-txt-6 {
					width: 210rpx;
					position: absolute;
					left: 1880rpx;
					top: 280rpx;
				}

				.img-point-7 {
					width: 300rpx;
					position: absolute;
					left: 1460rpx;
					bottom: 130rpx;
				}

				.img-txt-7 {
					width: 311rpx;
					position: absolute;
					left: 1510rpx;
					bottom: 200rpx;
				}

				.img-txt-7-b {
					width: 350rpx;
					position: absolute;
					left: 1450rpx;
					bottom: 180rpx;
				}

				.img-point-8 {
					width: 52rpx;
					position: absolute;
					left: 1050rpx;
					bottom: 280rpx;
				}

				.img-txt-8 {
					width: 185.5rpx;
					position: absolute;
					left: 1050rpx;
					bottom: 270rpx;
				}

				.img-point-9 {
					width: 160rpx;
					position: absolute;
					left: 560rpx;
					bottom: 300rpx;
					z-index: 10;
				}

				.img-txt-9 {
					width: 245rpx;
					position: absolute;
					left: 620rpx;
					bottom: 360rpx;
					z-index: 10;
				}

				.img-point-10 {
					width: 532rpx;
					position: absolute;
					left: 2200rpx;
					bottom: 70rpx;
				}

				.img-txt-10 {
					width: 350rpx;
					position: absolute;
					left: 2380rpx;
					bottom: 220rpx;
				}

				.img-txt-10-b {
					width: 600rpx;
					position: absolute;
					left: 2150rpx;
					bottom: 170rpx;
					z-index: 1;
				}

				.img-point-11 {
					width: 133rpx;
					position: absolute;
					left: 1990rpx;
					bottom: 130rpx;
				}

				.img-txt-11 {
					width: 143.5rpx;
					position: absolute;
					left: 2060rpx;
					bottom: 280rpx;
				}

				.img-point-12 {
					width: 843rpx;
					position: absolute;
					left: 0rpx;
					bottom: 50rpx;
				}

				.img-txt-12 {
					width: 252rpx;
					position: absolute;
					left: 300rpx;
					bottom: 200rpx;
				}

				.img-point-13 {
					width: 196rpx;
					position: absolute;
					left: 350rpx;
					bottom: 390rpx;
				}

				.img-txt-13 {
					width: 245rpx;
					position: absolute;
					left: 470rpx;
					bottom: 470rpx;
				}

				.img-point-14 {
					width: 56rpx;
					position: absolute;
					left: 1830rpx;
					bottom: 230rpx;
					z-index: 10;
				}

				.img-txt-14 {
					width: 119rpx;
					position: absolute;
					left: 1880rpx;
					bottom: 250rpx;
					z-index: 10;
				}

				.img-txt-14-b {
					width: 119rpx;
					position: absolute;
					left: 1880rpx;
					bottom: 250rpx;
				}

				.img-point-15 {
					width: 465rpx;
					position: absolute;
					left: 1900rpx;
					bottom: 10rpx;
				}

				.img-txt-15 {
					width: 252rpx;
					position: absolute;
					left: 2150rpx;
					bottom: 190rpx;
				}

				.img-point-16 {
					width: 290rpx;
					position: absolute;
					left: 1450rpx;
					bottom: 0rpx;
				}

				.img-txt-16 {
					width: 213rpx;
					position: absolute;
					left: 1550rpx;
					bottom: 260rpx;
				}

				.img-point-17 {
					width: 332rpx;
					position: absolute;
					left: 1150rpx;
					bottom: 230rpx;
				}

				.img-txt-17 {
					width: 196rpx;
					position: absolute;
					left: 1000rpx;
					bottom: 450rpx;
				}

				.img-point-18 {
					width: 381rpx;
					position: absolute;
					left: 680rpx;
					bottom: 0rpx;
				}

				.img-txt-18 {
					width: 147rpx;
					position: absolute;
					left: 850rpx;
					bottom: 200rpx;
				}

				.img-point-19 {
					width: 350rpx;
					position: absolute;
					left: 80rpx;
					bottom: 0rpx;
				}

				.img-txt-19 {
					width: 266rpx;
					position: absolute;
					left: 250rpx;
					bottom: 200rpx;
				}
			}

			.box-course-1 {
				.box-header {
					.music-main {
						top: 17rpx;
					}

					.box-progress {
						top: 120rpx !important;
					}
				}
			}

			.box-course-2 {
				.box-header {
					.music-main {
						left: 744rpx;
						top: 17rpx;
					}
				}
			}

			.box-course-3 {
				.box-header {
					.music-main {
						left: 744rpx;
						top: 17rpx;
					}

					.box-progress {
						left: 384rpx !important;
						top: 116rpx !important;

						.point,
						.active {
							width: 15rpx;
							height: 15rpx;
						}
					}
				}
			}
		}
	}

	.sv-content-1 {
		.box-dialog {
			img {
				margin-left: -420rpx !important;
			}
		}
	}

	.sv-content-2 {
		.box-dialog {
			img {
				margin-left: -550rpx !important;
			}
		}
	}

	.sv-content-3 {
		.box-dialog {
			img {
				margin-left: -630rpx !important;
			}
		}
	}

	.rotate90 {
		transform: rotate(90deg);
		transform-origin: center;
	}

	@keyframes flash {
		0% {
			filter: drop-shadow(0px 0px 0px rgb(255, 255, 255));
		}

		50% {
			filter: drop-shadow(0px 0px 10rpx rgb(255, 255, 255));
		}

		100% {
			filter: drop-shadow(0px 0px 0px rgb(255, 255, 255));
		}
	}

	.flash {
		animation: flash 2s infinite ease-in-out;
	}

	@keyframes flash1 {
		0% {
			filter: drop-shadow(0px 0px 0px #91d6ff);
		}

		50% {
			filter: drop-shadow(0px 0px 10rpx #91d6ff);
		}

		100% {
			filter: drop-shadow(0px 0px 0px #91d6ff);
		}
	}

	.flash1 {
		animation: flash1 2s infinite ease-in-out;
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