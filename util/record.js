import { record } from '@/api/index'
import store from '../store'
import pagesJson from '@/pages.json'
let routeList = pagesJson.pages
function getRequest(url) {
  var jsonList = {};
  if (url.indexOf("?") > -1) {
    var str = url.slice(url.indexOf("?") + 1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      jsonList[strs[i].split("=")[0]] = strs[i].split("=")[1];//如果出现乱码的话，可以用decodeURI()进行解码
    }
  }
  return jsonList;
}
function logPageSheet({ route, signName, stayTime, type = 0 }) {
  let path = ""
  let query = ""
  if (route) {
    path = route.path
    query = route.query;  
  }else{
    path = window.location.pathname
    query = getRequest(window.location.search)
  }
  let member = uni.getStorageSync("member")
  let pageStyle = routeList.find((e) => {
    if (path == '/') {
      return routeList[0]
    } else {
      return "/" + e.path == path;
    }
  }).style;
  let pageName = pageStyle.recordTitle || pageStyle.navigationBarTitleText
  let sign = signName ? `${pageName}-${signName}` : pageName;
  let params = {
    pagePath: path == "/" ? "/" + routeList[0].path : path,
    pageQuery: JSON.stringify(query),
    sign,
    type,
    stayTime,
    browser: store.state.browser,
    device: store.state.device,
    memberId: member ? member.id : '',
    openId: uni.getStorageSync("openId"),
    unionId: uni.getStorageSync("unionId"),
    source: uni.getStorageSync("sourceChannel")
  };
  return new Promise((resolve) => {
    record(params).then((res) => {
      resolve(res);
    });
  });
}

export default {
  logPageSheet
}