const fs = require('fs')
//此处如果是用HBuilderX创建的项目manifest.json文件在项目跟目录，如果是 cli 创建的则在 src 下，这里要注意
//process.env.UNI_INPUT_DIR为项目所在的绝对路径，经测试，相对路径会找不到文件
const manifestPath = process.env.UNI_INPUT_DIR + '/manifest.json'
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })

function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]
 
  let i = 0
  let ManifestArr = Manifest.split(/\n/)
 
  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break;
    }
  }
 
  Manifest = ManifestArr.join('\n')
}
 
const uniScript = process.env.UNI_SCRIPT;
console.log("环境：",uniScript)
if(uniScript === 'h5-dev') {
	replaceManifest('h5.router.base', '""')
} else if (uniScript === 'h5-test') {
	replaceManifest('h5.router.base', '""')
} else if (uniScript === 'h5-prod') {
	replaceManifest('h5.router.base', '""')
} 

fs.writeFileSync(manifestPath, Manifest, {
  "flag": "w"
})

const path = require('path');
 
// 指定需要获取文件列表的目录
const fileList = [];
const directoryPath = path.join(process.env.UNI_INPUT_DIR, 'static');
 readdir(directoryPath);
 function readdir(dir) {
	 // 读取目录中的文件
	 fs.readdir(dir, (err, files) => {
	   // if (err) {
	   //   return console.log('Unable to scan directory: ' + err);
	   // } 
	   // 文件列表
	   files.forEach((file) => {
		 if(file.indexOf(".")>=0) {
			 if(file.indexOf(".png")>=0 || file.indexOf(".jpg")>=0  || file.indexOf(".jpeg")>=0 ) {
				fileList.push(dir.replace(process.env.UNI_INPUT_DIR,"").replaceAll("\\","/")+"/"+file)
				fs.writeFileSync(process.env.UNI_INPUT_DIR + "/static/file-list.json", JSON.stringify(fileList)) 
			 }

		 } else {
			var newDir = path.join(dir, file); // 递归多层级搜索文件
			readdir(newDir);		 
		 }
	   });
	 });
 }