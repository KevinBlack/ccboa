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


// 加载配置文件
CONTEXT_PATH='/bosWeb/';
PJF_IS_WIDTH=false;
OPEN_WIN_PROXY = false;

	JSLoader.loadStyleSheet(CONTEXT_PATH+"css/ytd-min.css");
	JSLoader.loadJavaScript(CONTEXT_PATH+"script/componet_locale_cn.js");
	JSLoader.loadJavaScript(CONTEXT_PATH+"script/configuration.js");	
	JSLoader.loadJavaScript(CONTEXT_PATH+"script/configuration-ytd.js");
	JSLoader.loadJavaScript(CONTEXT_PATH+"script/ytd.min.js");
