/**
 * P2 Framework JS Library 1.0 Copyright(c) 2012, China Construction Bank.
 *
 * @Author zhouyuhang Create on: 2012-12-13 Last Updated: 说明:包含jsloader和可配置项设置
 */
// jsloader compress code,dont modify it!!
function JSLoaderEnvironment(){this.prefix="/assets/";for(var g=!1,e=0,b=document.getElementsByTagName("script"),e=0;e<b.length;++e){var a=b[e].src,h=a;if(a&&(-1<a.indexOf("://")&&(a=a.substring(a.indexOf("://")+3),a=a.substring(a.indexOf("/"))),a&&a.indexOf("jsloader.js")==a.length-11||a&&a.indexOf("jsloader-debug.js")==a.length-17))(g=-1==h.indexOf(document.domain))&&(a=h),this.prefix=a.substring(0,a.lastIndexOf("/")+1)}this.suffix=".js";this.makeJSLoaderPath=function(d,f,a,b){return!f&&!a?this.stripExternalRef(d):
this.prefix+d+"/"+f+"/incr/versions/"+a+(b?this.suffix:"")};this.makePath=function(d,a,c){return!a&&!c?this.stripExternalRef(d):this.prefix+d+"/"+a+"/"+c+"/"};this.env={};this.loaders={};this.setEnv=function(d,a){this.env[d]=a};this.getEnv=function(d){return this.env[d]};this._loadedJSLoaders={};this.normalize=function(d,a,c){return(d+"__"+a+"__"+c).toLowerCase()};this.isLoaded=function(d,a,c){d=this.normalize(d,a,c);return null!=this._loadedJSLoaders[d]};this.getLoader=function(a,f,c){var b=this.normalize(a,
f,c),e=this.loaders[b];e||(e=new JSSubLoader(this,this.makeJSLoaderPath(a,f,c,!1)+"/"),a=this.makePath(a,f,c),this.setEnv(f.toUpperCase()+"_PATH",a),this.loaders[b]=e);return e};this.load=function(a,b,c){var e=this.normalize(a,b,c),g=this.makeJSLoaderPath(a,b,c,!0);try{this.isLoaded(a,b,c)||(this.loadJavaScript(g),this._loadedJSLoaders[e]="true")}catch(h){this.handleError(h)}};this.loadJavaScript=function(a){document.writeln("<script src='"+a+"' type='text/javascript'><\/script>")};this.loadStyleSheet=
function(a){document.writeln("<link rel='stylesheet' href='"+a+"' type='text/css'></link>")};this.stripExternalRef=function(a){var b=[/\.\.+/g,/\/\/+/g,/\\\\+/g,/\:+/g,/\'+/g,/\%+/g],b=[/\.\.+/g,/\\\\+/g,/\'+/g,/\%+/g];if(g)for(var c=0;c<b.length;c++)a=a.replace(b[c],"");return a};this.handleError=function(){};return this}
function JSSubLoader(g,e){this.environment=g;this.prefix=e;this.loaded={};this.normalize=function(b){return b.toLowerCase()};this.loadAll=function(b){for(i=0;i<b.length;++i)this.load(b[i])};this.load=function(b){var a=this.normalize(b);this.loaded[a]||(this.loaded[a]=b,this.environment.loadJavaScript(e+b+".js"))}}JSLoader=new JSLoaderEnvironment;

if(typeof(console)=='undefined'){
	console={};
	console.log=console.debug=console.error=console.info=function(arg) {};
}
//目前发现在IE9 frame情况下可能导致页面sendNSCommand在此时未初始化，所以做此赋值处理
try{
	if(typeof(sendNSCommand) == 'undefined' && typeof(top.sendNSCommand) == 'function'){
		sendNSCommand = top.sendNSCommand
	}
}catch(e){ //免得跨域出错了
	console.log(e.message);
}

OLD_WINDOW_CLOSE = window.close;

CLIENT_LANGUAGE = 'zh-cn';
// CLIENT_LANGUAGE = 'en-us';

if(typeof(sendNSCommand) != 'undefined'){
	window.close = 	function(){
		PJF.html.closeWin();
	}
	try {
		//获取客户端语言环境
		var langugaeFromClient = sendNSCommand('getClientEnv', 'language');
		if (langugaeFromClient[0] == '0' && langugaeFromClient[1])
			CLIENT_LANGUAGE = langugaeFromClient[1];
		console.log('客户端环境语言为:' + CLIENT_LANGUAGE);
	} catch (e) {
		console.log('客户端获取语言环境失败,' + e.message);
	}
}

//定义加载资源文件方法
JSLoader.loadResource = function(filePrefix){
	//加载国际化资源文件
	JSLoader.loadJavaScript(filePrefix + '_' + CLIENT_LANGUAGE + '.js');
}



//开发环境
//  CONTEXT_PATH = '/static/';
//生产环境
CONTEXT_PATH = '/ecpweb/page/ccboa/static/';


PJF_IS_WIDTH=false;
OPEN_WIN_PROXY = false;
if(window.screen.width>1024)
	PJF_IS_WIDTH=true;

	JSLoader.loadStyleSheet(CONTEXT_PATH+"css/easyui.css");
	JSLoader.loadStyleSheet(CONTEXT_PATH+"css/zTreeStyle.css");
	JSLoader.loadStyleSheet(CONTEXT_PATH+"css/pjf-min.css");
// 如果分辨率大于1024则加载新的css
if(PJF_IS_WIDTH)
	JSLoader.loadStyleSheet(CONTEXT_PATH+"css/pjfUl960.css");

(function(){
	function getCache(fileName,hasSuffix){
    	var localSucc = false;//是否从本地缓存读取成功
		//可能是多语言资源文件
		var realName = hasSuffix ? fileName + '_' + CLIENT_LANGUAGE : fileName;
		if(typeof(sendNSCommand) != 'undefined'){
			var res = sendNSCommand('getAppData','pjf-cache',realName);
			if(res[0] == 0 && res[1]){
				JSLoader.loadJavaScript("file:///" + res[1]);
				console.log('客户端获取缓存地址成功:' + realName);
				localSucc = true;
			}
			else{
				console.log('客户端获取缓存地址失败:' + realName);
			}
		}
		//从P2S上获取
		if(!localSucc){
			JSLoader.loadJavaScript(CONTEXT_PATH + 'script/' + realName + '.js')
		}
	}
	//safari下才走缓存
	var isSafari = window.navigator.userAgent.indexOf('AppleWebKit') != -1 ? true : false;

	if(isSafari){
		getCache("esl");
		getCache("componet_locale",true);
		getCache("jquery-1.8.0.min");
		getCache("jquery.ztree.all-3.5.min")
		getCache("jquery.ui")
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/configuration.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/pjf.min.js");
		getCache("highcharts");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/strophe.min.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/configuration-debug.js");
	}
	//IE下还是老姿势
	else {
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/esl.js");
		JSLoader.loadResource(CONTEXT_PATH + 'script/componet_locale');
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/jquery-1.8.0.min.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/jquery.ztree.all-3.5.min.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/jquery.ui.js");
		//JSLoader.loadJavaScript(CONTEXT_PATH+"script/jquery-ui-1.10.4.custom.min.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/configuration.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/pjf.min.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/highcharts.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/strophe.min.js");
		JSLoader.loadJavaScript(CONTEXT_PATH+"script/configuration-debug.js");
	}
})()


