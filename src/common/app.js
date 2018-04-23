/**
 * 封装和原生（ios和android）的交互类，
可以在vue的类中访问交互，方法挂载到window上工给原生调用
 */ 
var hybrid = {
    // 默认是安卓，主要用于判断是安卓还是ios
    type: 'android',
    // 区分安卓和ios的不同调用方式
    native: window.app,
    // 用于vue安装这个插件 这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象:
    install (Vue, options) {
        // 把当前的对象挂载到vue的全局
        Vue.prototype.$hybrid = this;
        Vue.prototype.$eventHub= Vue.prototype.$eventHub || new Vue({data:{'message':''}, template:'<div> {{message}} </ div>'});
        this.$eventHub = Vue.prototype.$eventHub;

        Vue.myGlobalMethod = function () {  // 1. 添加全局方法或属性，如: vue-custom-element
            // 逻辑...
            console.log('我是全局的方法');
        };
        Vue.directive('my-directive', {  // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
            bind (el, binding, vnode, oldVnode) {
                // 逻辑...
                console.log('我是全局的指令');
                el.style.color = binding.value.color;
                el.innerHTML = binding.value.text;
            },
            update (el, binding) {
                el.style.color = binding.value.color;
                el.innerHTML = binding.value.text;
            }
        });
        Vue.mixin({
            created: function () {  // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
                // 逻辑...
                // 合并一些东西到引入的组件内
                this.message = "我在封装的类内声明的变量";
            }
        });
        Vue.prototype.$myMethod = function (options) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
            // 逻辑...
            console.log('我是实例上的一个方法');
        }
    },
    // 主要用户初始化信息
    initType (params) {
        if (params == 'ios') {
            hybrid.type = "ios";
        }
        console.log(hybrid.type);
    },
    // 发送给原生的方法,...params : 这个参数就是一个数组
    send (...params) {
        console.log(params);
    },
    // 注册原生发过来的方法,name需要注册的方法的名字
    registerHandler (name, callBack) {
        console.log(name + "js 处理原生发送的数据");
        try {
            // eval(this.native.callBack) 必须指定清楚那个对象的函数名字
            if (typeof(eval(this.native.callBack)) == "function") {    
                eval("this.native." + callBack + "('js处理完成之后的结果回传给原生客户端');");
            } else {
                // 函数不存在, 抛出异常提示函数不存在
                alert(callBack);
            }
        }catch(err){
            alert(err) // 可执行
        }
    },
    appGoBack(index) {
        console.log("原生调用封装类" + index);
        //调用$emit 方法, 来发送全局的函数
        this.$eventHub.$emit('goBack', index);
    }
}
// 把vue中绑定的对象挂载到window上
window.Hybrid = hybrid;
// if (window.Vue) { // 自动绑定
//     window.Vue.use(hybrid);
// }
// 导出共给vue组件中引入使用
export default hybrid