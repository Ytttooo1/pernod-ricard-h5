let apiHost = ''
let h5Host = ''
let staticUrl = ""
let wxDebug = false;
let wxAppId = "";
let wxComponentAppId = "";
let activityCode = "driving-training-2024"
const version = "0.7.7"
import Vconsole from 'vconsole'

//#ifdef DEV-H5
console.log("DEV-H5");
//h5Host = "http://pernod-ricard.zhiytech.com";
//wxAppId = "wx731c468324e1154d"; // 公众号：广州知远信息科技 
wxAppId = "wxf55db63182f246fb"; // 公众号：保乐力加中国 
wxComponentAppId = "wx9546b96ed04aad74"; // 第三方平台：知远科技component_appid
new Vconsole()
uni.setStorageSync("openId","ouDxQv-hEGfc1gfH8FKknRPIdYwA")
uni.setStorageSync("wxUser",{"type":"object","data":{"openid":"ouDxQv-hEGfc1gfH8FKknRPIdYwA","unionid":"oUDu5wefvq5kIuqEmFu8Ed6WC02E","nickname":"郭焕鑫","sex":0,"city":"","province":"","country":"","headimgurl":"https://thirdwx.qlogo.cn/mmopen/vi_32/UGyjPibnzwu3DwFfoib6NBJOK57LXEcic3MJUI3MuoAkv2KNY0LvRAuxsWcr42DQKVic7q3XiaZmHpsQBC06HJst1kQ/132","privileges":[]}})
//#endif

//#ifdef TEST-H5
console.log("TEST-H5");
h5Host = "http://cdn.zhiytech.com/pernod-ricard"
wxAppId = "wxf55db63182f246fb"; // 公众号：保乐力加中国 
wxComponentAppId = "wx9546b96ed04aad74"; // 第三方平台：知远科技component_appid
new Vconsole()
//#endif

//#ifdef PROD-H5
console.log("PROD-H5");
h5Host = "http://cdn.zhiytech.com/pernod-ricard"
wxAppId = "wxf55db63182f246fb"; // 公众号：保乐力加中国 
wxComponentAppId = "wx9546b96ed04aad74"; // 第三方平台：知远科技component_appid
wxDebug = false;
//#endif

console.log("h5Host", h5Host)
console.log('当前版本',version);
staticUrl = h5Host + "/static";

var oldVersion = uni.getStorageSync("version")
if (!oldVersion || oldVersion != version) {
	// 版本不一致，清除缓存
	uni.clearStorageSync();
	uni.setStorageSync("version", version);
}


let introduction = `各位入营者你们好，欢迎来到“理性青年驾到「清醒驾驶」训练营”（以下简称“训练营”）！

本训练营旨在鼓励入营者学习酒精相关知识、认识酒精对身体的影响、了解道路安全相关法规，从而提升入营者的道路交通安全意识，预防和减少由酒后驾驶引发的交通事故，并促进联合国全球道路安全工作目标的达成。

本期训练营的开放时间为2024年5月25日至2024年6月25日，祝你在轻松的学习氛围中收获满满，成为一名合格的“理性青年”！


<span style="font-weight: bold;">活动规则</span>
训练营共设「清醒」驾校、「清醒」街区和「清醒」小酒馆3个学习体验点，各位入营者可以在不同场景中通过沉浸式互动获取知识。

各位入营者可以随时点击“直通结营考核”按钮进行答题，答题时间不限，答题轮数不限。每轮考核随机生成10道题，答对8道题即视为通过结营考核。若中途退出考核则当局成绩作废，各位入营者可以再次点击“直通结营考核”按钮开启新一轮考核。

通过结营考核后，各位入营者可填写相关信息获取联合国训练研究所认证的电子证书，并获得一次抽奖机会。
*每位入营者仅可获得一张电子证书及一次抽奖机会。


<span style="font-weight: bold;">抽奖相关说明</span>
<span style="text-decoration: underline;">奖池设置</span>
奖品包括：
（1）滴滴出行10元打车券250张，中奖率15%；
（2）网易云音乐黑胶VIP月卡250张，中奖率15%；
（3）滴滴青桔单车30天畅骑卡250张，中奖率15%；
（4）腾讯视频VIP月卡250张，中奖率15%。
本次奖池仅包括如上四种奖品，总中奖率为60%，每位中奖的入营者仅可随机抽取到其中任意一种奖品。

<span style="text-decoration: underline;">奖品获取方式</span>
奖品以兑换券码形式发放，中奖的入营者需在奖品页面复制并妥善保管兑换券码，并在7月1日前至相应APP进行兑换。

<span style="text-decoration: underline;">奖品兑换流程</span>
滴滴出行10元打车券：复制券码-打开滴滴出行APP-点击【我的】-点击【优惠券】-点击【券兑换】-粘贴券码-点击【兑换】
网易云音乐黑胶VIP月卡：复制券码-打开网易云音乐APP-点击左上角图标-点击【优惠券】-点击【兑换】-粘贴券码-点击【立即兑换】
滴滴青桔单车30天畅骑卡：复制券码-打开滴滴青桔APP-点击左上角图标-点击【钱包】-点击【兑换骑行优惠】-粘贴券码-点击【兑换】
腾讯视频VIP月卡：复制券码-打开腾讯视频APP-点击【个人中心】-点击【视频VIP】-点击【兑换码中心】-粘贴券码-输入手机号并获取验证码-输入验证码-点击【立即验证，完成兑换】


<span style="font-weight: bold;">其他说明</span>
•	本次活动仅限本人参与，电子证书及抽奖奖品仅供本人领取。如因交由他人领取导致无法正常发放电子证书或奖品将不再补发。
•	对于任何通过不正当手段参加活动者，主办方一经核实，可在不事先通知的前提下取消其参加活动及获奖资格。
•	主办方不对因网络原因对本次活动过程及电子证书领取或抽奖环节造成的影响承担责任。
•	各位入营者参与抽奖后，应及时兑换奖品券码，对于未及时兑换券码产生的影响，主办方不承担任何责任。
•	各位入营者获得证书或抽中奖品后可以在H5相关页面查看证书及奖品。请及时下载并妥善保管电子证书及奖品券码，本次活动结束时间为2024年6月25日23:59，届时，活动通道关闭，您将无法通过本H5查看证书及奖品。
•	如不可抗力因素导致本活动无法进行，主办方有权在法律允许的范围内取消、终止、修改或暂停本活动。
`

let privacyText = `
	<p style="font-weight: bold;text-align:center;">“理性青年驾到「清醒驾驶」训练营”隐私条款</p>
	<p style="text-indent: 20px;">“理性青年驾到「清醒驾驶」训练营”是“预防酒驾——清醒驾驶培训计划”的H5线上教育平台，由联合国训练研究所和保乐力加共同管理。</p>
	<p style="text-indent: 21px;font-weight: bold;text-decoration: underline;">请您在此确认，您已满18周岁，如您未成年，请勿提供您的个人信息。您了解并同意保乐力加<span class="info-policy" style="color:#409EFF;text-decoration-color:#409EFF;">《个人信息保护政策》</span>，并同意下述特殊条款，下述特殊条款与保乐力加<span class="info-policy" style="color:#409EFF;text-decoration-color:#409EFF;">《个人信息保护政策》</span>冲突的，以本许可特殊条款为准。保乐力加将在您的同意范围内对您的个人信息进行处理。</p>
	<p style="text-indent: 21px;">依照本许可负责处理您的个人信息的实体是位于瑞士日内瓦的联合国训练研究所（以下简称“我们”），我们尊重并保护您的个人隐私，重视您的个人信息保护，为了遵守相关法律法规要求，我们通过本协议向您单独展示本H5页面服务处理您个人信息的方式并获取您的授权同意。</p>
	<br />
	本许可中各节的主题内容如下：<br/>
	1. 我们如何收集、使用您的个人信息 <br/>
	2. 我们如何共享、转让、公开披露和委托处理您的个人信息 <br/>
	3. 我们如何存储您的个人信息 <br/>
	4. 您的个人信息权利 <br/>
	5. 我们如何使用 Cookies 和同类技术 <br/>
	6. 我们如何保护您的个人信息 <br/>
	7. 与我们取得联系<br/>
	<br/>
	<p style="font-weight: bold;">1.  我们如何收集、使用您的个人信息</p>
	个人信息是指以电子或者其他方式记录的，与已识别或者可识别的自然人有关的各种信息。我们会遵循合法、正当、必要的原则，出于本许可所述的以下目的，收集和使用您在使用服务过程中主动提供或因使用我们的服务而产生的个人信息。 <br/>
	请注意：单独或与其他信息相结合无法识别您的身份或者与您直接建立联系的信息，不属于个人信息。此外，经匿名化处理后（即采用技术手段对个人信息进行处理后，使得个人信息主体无法被识别，且处理后不能被复原）的信息，也不属于个人信息。我们在收集、使用此类信息时，无需征得您的授权同意。当您的信息可以单独或结合其他信息识别到您的个人身份时，这些信息将作为您的个人信息按照本许可处理与保护。<br/>
	<br/>
	<p style="font-weight: bold;">1.1您须授权我们收集和使用您个人信息的情形</p>
	我们将基于合法、正当、必要的原则收集、保存和使用下列与您有关的信息，以实现下列功能。 <br/>
	<br/>
	<p style="font-weight: bold;">（1）消息通知功能</p>
	您可以通过我们提供的消息通知服务（包括应用推送和邮箱推送），获得与您所获证书及所获奖品有关的信息。<span style="font-weight: bold;">为向您提供该服务的目的，在获得您授权的前提下，我们可能需要将您的设备信息及位置信息共享给我们指定的提供消息发送或推送服务的供应商。</span>设备信息是指我们会根据您在访问或使用中的具体操作，接收并记录您所使用的设备相关信息，包括您的设备型号、操作系统版本、设备设置、<span style="font-weight: bold;">MAC</span>地址、<span style="font-weight: bold;">IMEI、IMSI、Android ID、IDFA、OAID</span>等设备标识符、设备环境、移动应用列表等软硬件特征信息。<br/>
	<br/>
	<p style="font-weight: bold;">（2）安全管理</p>
	为安全风控之目的，确保操作环境安全与识别账号异常状态，更好地保护您或其他用户或公众的人身财产安全免遭侵害，以及更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或相关协议规则的情况，我们可能使用或整合您的位置信息、设备信息及其他与我们服务有关的服务日志信息以及我们合作伙伴取得您授权或依据法律共享的信息，来进行身份验证、检测及防范安全事件，并依法采取必要的记录、调查、审计、分析、处理措施。如您不同意我们记录前述信息，可能无法确保您与其他用户的账号安全。<br/>
	<br/>
	<p style="font-weight: bold;">1.2 根据相关规定，在以下情形中，我们可能会依法收集、使用、分享、转让或公开披露您的个人信息，而无需征得您的同意</p>
	为订立、履行个人作为一方当事人的合同所必需；<br/>
	为履行法定职责或者法定义务所必需；<br/>
	为应对突发公共卫生事件，或者紧急情况下为保护自然人的生命健康和财产安全所必需；<br/>
	为公共利益实施新闻报道、舆论监督等行为，在合理的范围内处理个人信息；<br/>
	依照《个人信息保护法》规定在合理的范围内处理个人自行公开或者其他已经合法公开的个人信息；<br/>
	法律、行政法规规定的其他情形。<br/>
	<br/>
	<p style="font-weight: bold;">2. 我们如何共享、转让、公开披露和委托处理您的个人信息</p>
	<p style="font-weight: bold;">2.1共享</p>
	我们原则上不会与其他公司、组织和个人共享您的个人信息，但以下情况除外：<br/>
	<p>
		<span style="font-weight: bold;">·  在获取您明确同意的情况下共享：</span>基于具体业务场景的需要，在获得您的明确同意后，我们会与其他方共享您的个人信息。如果将您的信息共享至第三方，我们将评估该第三方收集信息的合法性、正当性、必要性，并以确认协议、具体场景下的文案确认、弹窗提示等形式征得您的同意，或确认第三方已征得您的同意。
	</p>
	<p>
		<span style="font-weight: bold;">·  在法定情形下的共享：</span>我们可能会根据法律法规的要求、或为解决诉讼争议的需要，或按行政及司法机关提出的合法要求，共享您的个人信息。
	</p>
	<p>
		<span style="font-weight: bold;">·  与我们的关联方间共享：</span>为便于我们向您提供服务，内部分析研究与财务核算，以及保护我们关联公司、其他用户或公众的人身财产安全免遭侵害，您的个人信息可能会与我们的关联公司共享。我们只会共享必要的个人信息，且受本许可中所声明目的的约束。
	</p>
	<p>
		<span style="font-weight: bold;">·  与授权合作伙伴共享：</span>我们可能委托授权合作伙伴为您提供某些服务或代表我们履行职能，我们可能会向业务合作伙伴共享为您提供服务所必要的信息。我们仅会出于本许可声明的合法、正当、必要、特定、明确的目的共享您的信息。授权合作伙伴只能接触到其履行职责所需信息，且不能将此信息用于其他任何目的。我们的授权合作伙伴主要包括以下类型：
	</p>
	1.技术服务的授权合作伙伴。我们会将您的必要个人信息共享给支持我们功能的供应商。这些支持包括为我们提供技术服务、卡券发放、数据处理等。我们共享这些信息的目的是可以实现我们服务的基本功能。<br/>
	2.调研分析服务类的服务供应商。我们可能会将您的个人信息与提供调研分析服务的服务供应商分享。<br/>
	3.第三方SDK类服务商。<br/>
	请您知悉，我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，对我们仅为实现本许可中声明的目的与之共享个人信息的公司、组织和个人，我们会与其签署相关信息保护和保密条款，要求他们遵守协议并采取相关的安全措施来保护您的个人信息。<br/>
	<br/>
	<p style="font-weight: bold;">2.2转让</p>
	我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：<br/>
	<span style="font-weight: bold;">·  </span>事先获得您明确的同意或授权进行的转让；<br/>
	<span style="font-weight: bold;">·  </span>根据相关法律法规、法律程序的要求、行政或司法要求所要求的情况下；<br/>
	<span style="font-weight: bold;">·  </span>在涉及合并、收购、资产转让或类似的交易时，如涉及到个人信息转让的，我们会要求新的持有您个人信息的公司、组织继续受本许可的约束，否则，我们将要求该公司、组织重新向您征求授权同意。<br/>
	<br/>
	<p style="font-weight: bold;">2.3 披露</p>
	除了取得您的明确同意而进行必要的公开披露外，我们不会对您的个人信息进行披露。但基于法律规定、司法机关或行政机关强制性要求的情况下，我们可能会向有权机关披露您的个人信息。但是，发生上述情况时，我们会要求披露请求方必须出具与之相应的有效法律文件，并对被披露的信息采取必要的安全防护措施。<br/>
	<br/>
	<p style="font-weight: bold;">2.4 根据相关法律法规及国家标准，在以下情形中，我们共享、转让、公开披露您的个人信息无需征得您的同意：</p>
	<span style="font-weight: bold;">·  </span>根据您的要求签订和履行合同所必需；<br/>
	<span style="font-weight: bold;">·  </span>为我们履行法定义务所必需；<br/>
	<span style="font-weight: bold;">·  </span>为应对突发公共卫生事件，或者紧急情况下为保护您或他人的生命健康和财产安全所必需；<br/>
	<span style="font-weight: bold;">·  </span>为公共利益实施新闻报道、舆论监督等行为，在合理的范围内处理您的个人信息；<br/>
	<span style="font-weight: bold;">·  </span>在合理的范围内处理您自行公开或者其他已经合法公开的个人信息；<br/>
	<span style="font-weight: bold;">·  </span>法律、行政法规规定的其他情形。<br/>
	<br/>
	<p style="font-weight: bold;">3. 我们如何存储您的个人信息</p>
	我们严格遵循最短期限原则留存您的个人信息。若相关法律法规对我们保存您的个人信息的期限有明确规定的，我们将首先遵守该等规定；没有明确规定的，我们将保存您的个人信息，直至：（1）我们收集、使用、分享您个人信息的目的全部实现。（2）您终止使用我们的服务，或不再参与我们的活动。（3）您明确要求我们删除您的个人信息。个人信息保存到期后，我们将采取删除、匿名化处理或者法律法规认可的其他处理方式。<br/>
	<br/>
	<p style="font-weight: bold;">4. 您的个人信息权利</p>
	您的个人信息无法由我们为您提供访问和更正的服务。我们仅会在您的授权范围内使用这些信息。<br/>
	<br/>
	<p style="font-weight: bold;">5. 我们如何使用 Cookies 和同类技术</p>
	Cookie和同类设备信息标识技术是互联网中普遍使用的技术。在您使用相关平台时，我们（或我们所委托的第三方）可能会使用相关技术向您的设备发送一个或多个 Cookie 或匿名标识符（以下简称“Cookie”），以收集、标识和存储您访问我们的网络平台时的信息。我们承诺，不会将 Cookie 用于本许可所述目的之外的任何其他用途。我们使用 Cookie 主要为了保障产品与服务的安全、高效运转，可以使我们确认您账户与交易的安全状态，排查崩溃、延迟的相关异常情况，帮助您省去重复您填写表单、输入搜索内容的步骤和流程。<br/>
	为了全面概括（通过平台网站或其他）访问您的网络浏览器的第三方名单，我们建议您安装可实现该目的的网络浏览器插件。大多数浏览器均为用户提供了清除浏览器缓存数据的功能，您可以进行相应的数据清除操作，您也可选择每次发送 cookie 时由您的计算机发出警告，或关闭所有 cookie。您可通过您所用浏览器和设备上的浏览器设置完成该操作。各浏览器略有不同，请查看您的浏览器帮助菜单，了解修改您的 cookie 的正确方式。如果您关闭 cookie，您可能无法使用协助我们的网络平台更高效运行的许多功能，我们的某些服务也可能会无法正常运行。<br/>
	微信小程序上有关 Cookies 的使用受制于腾讯的 cookie 政策，请详见https://privacy.qq.com/policy/cookie-privacypolicy。<br/>
	<br/>
	<p style="font-weight: bold;">6. 我们如何保护您的个人信息</p>
	我们非常重视您的个人信息安全。为此，我们致力于采用各类安全防护措施，包括建立合理的信息安全管理政策、执行安全技术等，来尽可能地降低您的个人信息受到各类未经授权的访问、使用、修改、披露、损坏、删除的风险。这些措施包括但不限于：<br/>
	<span style="font-weight: bold;">·  </span>在信息传输的过程中，我们对您输入的信息进行加密传输，尽可能减少您所输入的信息被截取的风险；<br/>
	<span style="font-weight: bold;">·  </span>在传输和存储个人敏感信息时，我们采用各类加密、权限控制、去标识化等安全措施，确保传输和存储的安全性；在传输和存储个人敏感信息时，我们采用各类加密、权限控制、去标识化等安全措施，确保传输和存储的安全性；<br/>
	<span style="font-weight: bold;">·  </span>我们对我们数据中心的访问权限做了严格管控，旨在防止您的信息遭受未经授权的访问和使用；<br/>
	<span style="font-weight: bold;">·  </span>我们设立了信息安全专职团队来推进和保障个人信息安全，并建立了各项与数据分类分级、数据安全管理、数据安全开发、应急响应等的政策和流程，来管理和规范个人信息的存储和使用。<br/>
	需要说明的是，现实生活中并不存在绝对安全的信息环境，特别地，在某些特殊情况下，尽管我们采取了各类安全防护措施，但仍然存在个人信息泄露或丢失的风险（例如黑客攻击等）。<span style="font-weight: bold;">为此，为了保护您的人身或财产安全，您也应采取积极措施保证个人信息安全，如不将个人的账户和信息透露给他人；不在任何非可靠的信息环境里，向我们或任何以我们名义为您提供服务的第三方提供您的个人信息。</span><br/>
	在您终止使用我们的产品和服务后，我们会停止对您的信息的收集和使用（但法律法规或监管部门另有规定的除外）。如我们停止相关服务或运营，我们将及时停止收集您个人信息的活动，并将停止运营的通知以逐一送达、公告或其他适当的方式提前通知您，并在终止相关服务或运营后，对所持有的您的个人信息进行删除、匿名化处理或采取符合相关法律法规规定的其他处理方式。<br/>
	如果我们获悉不幸发生任何个人信息安全事件，我们会按照法律法规的要求尽可能通过多渠道来告知您，如难以逐一告知的，我们会采取合理可行的方式发布公告。此外，我们还会遵照有权监管部门的要求，上报个人信息安全事件的处置情况。<br/>
	<br/>
	<p style="font-weight: bold;">7. 与我们取得联系</p>
	如果您对本许可有任何疑问、意见或建议，或希望作出与本许可有关的投诉或举报，您可以通过如下方式联系我们：<br/>
	<p style="font-weight: bold;">邮箱： communications@unitar.org</p>
`

export default {
	wxDebug,
	wxAppId,
	wxComponentAppId,
	h5Host,
	apiHost,
	staticUrl,
	activityCode,
	introduction,
	privacyText
};