
export function preload(url) {
	return new Promise((resolve, reject) => {
		// if(url.indexOf(".mp3")>=0) {
		// console.warn(url)
		// 	console.log("preloadAudio",url)
		// 	preloadAudio(url).then(res=>{
		// 		resolve(res);
		// 	});
		// }
		// else if(url.indexOf(".mp4")>=0) {
		// 	console.log("preloadVideo",url)
		// 	preloadVideo(url).then(res=>{
		// 		resolve(res);
		// 	});
		// } else {
			preloadImage(url).then(res=>{
				resolve(res);
			});
		// }
	});
}
/**
 * 图片预加载
 */
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = "http://cdn.zhiytech.com/pernod-ricard" + url;
 
    img.onload = () => {
      resolve(img);
	  
    };
    img.onerror = (err) => {
      resolve(err);
    };
  });
}
/**
 * 视频预加载
 */
export function preloadVideo(url) {
    console.log(url)
  return new Promise((resolve, reject) => {
    const video = new Video();
    video.src = url;
 
    video.onload = () => {
      resolve(video);
    };
 
    video.onerror = (err) => {
      resolve(err);
    };
  });
}
/**
 * 音频预加载
 */
export function preloadAudio(url) {
    console.log(url)
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = url;
    audio.onload = () => {
      resolve(video);
    };
    audio.onerror = (err) => {
      resolve(err);
    };
  });
}