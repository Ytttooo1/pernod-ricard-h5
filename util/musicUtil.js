function Music() {
	this.init = async function (url) {
		let contextClass = window.AudioContext = window.AudioContext || window.webkitAudioContext || window
			.mozAudioContext || window.msAudioContext;
		this.context = new contextClass();
		this.url = url;
		this.state = true;

		// 下载音乐
		const response = await fetch("http://cdn.zhiytech.com/pernod-ricard" + this.url);
		const arrayBuffer = await response.arrayBuffer();
		let that = this;
		this.context.decodeAudioData(arrayBuffer, function (b) { //解码成功时的回调函数
			that.buffer = b;
		}, function (e) { //解码出错时的回调函数
			console.log('404', e);
		});
	};
	this.play = function (buffer) {
		if (this.state) {
			this.bufferSource = this.context.createBufferSource();
			this.bufferSource.buffer = this.buffer;
			this.bufferSource.loop = true;
			this.bufferSource.connect(this.context.destination);
			this.bufferSource.start(0); //立即播放    
		}
	};
	this.stop = function () {
		this.state = false;
		if (this.context) {
			this.stopTime = this.context.currentTime - this.startTime;
		}
		if (this.bufferSource) {
			this.bufferSource.stop();
			this.bufferSource.disconnect()
		}
	};
	this.start = function () {
		if (this.context) {
			this.startTime = this.context.currentTime;
		}
		this.state = true;
		this.bufferSource = this.context.createBufferSource();
		this.bufferSource.buffer = this.buffer;
		this.bufferSource.loop = true;
		this.bufferSource.connect(this.context.destination);
		this.bufferSource.start(0); //继续播放 
	};
	this.restart = function () {
		let restartTime = this.context.currentTime + this.stopTime;
		this.state = true;
		this.bufferSource = this.context.createBufferSource();
		this.bufferSource.buffer = this.buffer;
		this.bufferSource.loop = true;
		this.bufferSource.connect(this.context.destination);
		this.bufferSource.start(0, restartTime); //继续播放 
	};
	this.change = function () {
		this.state = !this.state;
		if (this.state) {
			this.start();
		} else {
			this.stop();
		}
	};
}

let musicList = [];

function get(url) {
	url = url || uni.getStorageSync("music_url");
	let musicObj = null;
	for (var i = 0; i < musicList.length; i++) {
		let e = musicList[i];
		if (e.url == url) {
			musicObj = e.obj;
		} else {
			e.obj.stop();
		}
	}
	return musicObj;
}

function load(url) {
	playEnable = uni.getStorageSync("music_enable")
	uni.setStorageSync("music_url", url);
	if (playEnable) {
		let musicObj = get(url);
		if (musicObj.buffer) {
			musicObj.start();
		} else {
			setTimeout(() => {
				load(url); // 递归检查
			}, 200);
		}
	}
}

function stop(url) {
	playEnable = uni.getStorageSync("music_enable")
	let musicObj = get(url);
	musicObj.stop();
}

function start(url) {
	playEnable = uni.getStorageSync("music_enable")
	if (playEnable) {
		let musicObj = get(url);
		musicObj.start();
	}
}

function restart(url) {
	playEnable = uni.getStorageSync("music_enable")
	if (playEnable) {
		let musicObj = get(url);
		musicObj.start();
	}
}

function disconnect(url) {
	playEnable = uni.getStorageSync("music_enable")
	let musicObj = get(url);
	musicObj.stop();
}


function change(url) {
	return new Promise((resolve, reject) => {
		playEnable = uni.getStorageSync("music_enable")
		playEnable = !playEnable
		uni.setStorageSync("music_enable", playEnable);
		if (playEnable) {
			let musicObj = get(url);
			if (musicObj.buffer) {
				musicObj.start();
				resolve()
			} else {
				uni.showToast({
					icon: "none",
					title: "音乐正在加载，请稍等"
				})
				reject()
			}
		} else {
			let musicObj = get(url);
			musicObj.stop();
			resolve()
		}
	})
}

let playEnable = false;
function init() {
	let musicUrlList = [
		"/static/music/other.mp3",
		"/static/music/course_1.mp3",
		"/static/music/course_2.mp3",
		"/static/music/course_3.mp3"
	];
	// 提前加载音乐资源
	musicUrlList.forEach(url => {
		let musicObj = new Music();
		musicObj.init(url);
		musicList.push({
			url: url,
			obj: musicObj
		});
	})

	playEnable = false;
	uni.setStorageSync("music_enable", playEnable)
}

export default {
	init,
	load,
	stop,
	start,
	change,
	disconnect
};