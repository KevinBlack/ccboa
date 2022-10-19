/*
 * @Author: your name
 * @Date: 2020-09-10 16:59:48
 * @LastEditTime: 2021-12-14 14:11:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './util/global.js'
import router from './router'
import store from './store'
import uploader from 'vue-simple-uploader' // 大文件上传第三方
//金格插件iwebOffice
import WebOffice from './common/js/WebOffice'
import WpsOffice from './common/js/wps/wpsOffice'
// import './common/js/jquery-1.11.2.min'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自定义样式
import './assets/css/reset.css'
// import './assets/css/common.less'
// 全局化
import VueGlobalPlugin from './plugins/VueGlobalPlugin'
// 全局组件化导航及侧边栏
import devArticle from './components/article/article.vue'
import TipDialogGlobal from './components/tip-dialog'
import CommonDateRangeGlobal from './components/common-date-range'
import Print from '@/print'
import currentDateTimeMixin from '@/minixs/current-date-time-mixin'
import {
  Message
} from 'element-ui'

// 富文本
import '../public/static/UE/ueditor.config.js'
import '../public/static/UE/ueditor.all.js'
import '../public/static/UE/lang/zh-cn/zh-cn.js'
import '../public/static/UE/ueditor.parse.min.js'

ElementUI.Dialog.props.closeOnClickModal.default = false;
Vue.prototype.WebOffice =  getMachineType()?WebOffice:WpsOffice;
Vue.use(ElementUI, {
  size: "small"
})
Vue.use(VueGlobalPlugin)
Vue.use(uploader)
Vue.use(TipDialogGlobal)
Vue.use(CommonDateRangeGlobal)
Vue.use(Print)
Vue.mixin(currentDateTimeMixin)
Vue.component('nav-article', devArticle)

// import Freedomen from 'vue-elementui-freedomen'
// Vue.use(Freedomen)
// 过滤器
import filters from './util/filters'
import './util/dialog' //   v-dialogDrag实现拖动
//公共表单标题样式
import './assets/css/shiwutitle.css'
//便函表单公共样式
import './assets/css/bianhan.css'
// 注册全局自定义过滤器，可用于一些常用的文本格式化
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// Vue.directive('maxT', {
//   bind: function (el,binding,vnode) {
//     console.log(el)
//   },
//   update: function (el,binding,vnode) {
//     if(binding.value.length>200 && el.firstElementChild.value===binding.value) {
//       Message.close()
//       Message.error('输入内容超过200字限制,请修改!')
//       vnode.componentInstance.value = binding.value.substr(0,200);
//     }
//   }
// })

// 注册全局自定义指令 v-maxF
// 钩子函数：bind-指令第一次绑定到元素时调用；update-所在组件的VNode更新时调用
Vue.directive('maxF', {
  bind: function (el, binding, vnode) {
    console.log(el)
  },

  update: function (el, binding, vnode) {
    console.log(vnode);
    if (vnode.componentInstance.type === 'textarea') {
      if (binding.value.length > 500 && el.firstChild.value === binding.value) {
        // Message.close()
        // Message.error('输入内容超过500字限制,请修改!')
        el.parentElement.parentElement.className = 'el-form-item is-required is-error'
        el.nextSibling.innerText = '输入内容超过500字限制,请修改!'
        // vnode.componentInstance.value = binding.value.substr(0,500);
        vnode.context.fromdata[binding.arg] = binding.value.substr(0, 500)
      }
    } else {
      if (binding.value.length > 200 && el.firstElementChild.value === binding.value) {
        el.parentElement.parentElement.className = 'el-form-item is-required is-error'
        el.nextSibling.innerText = '输入内容超过200字限制,请修改!'
        // vnode.componentInstance.value = binding.value.substr(0,200);
        // binding.value.set[binding.value.name] =  binding.value.substr(0,500);
        vnode.context.fromdata[binding.arg] = binding.value.substr(0, 200)
      }
    }

  }
})

// 注册全局自定义指令 v-preventClick。 钩子函数：inserted-被绑定元素插入父节点时调用
Vue.directive('preventClick', {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, 2000);
      }
    });
  }
})
// 定时退出
// import LoginOut from './util/loginout'

// Vue.use(LoginOut)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
