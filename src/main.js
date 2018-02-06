// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vConsole from 'vconsole'
// 导入封装的组件
import hybrid from './common/app';
// 使用组件绑定
Vue.use(hybrid, this);

Vue.config.productionTip = false
// 手机页面上显示调试控制台
var vConsole22 = new vConsole();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
