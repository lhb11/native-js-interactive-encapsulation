/**
 * 对app.js做优化处理
 * 自执行匿名函数
 * 常见格式：(function(){  code  })();
    解释：包围函数(function(){  code  })的第一对括号向脚本返回未命名的函数，随后一对空括号立即执行返回的未命名函数，括号内为匿名函数的参数。
    作用：可以用它创建命名空间，只要把自己的所有代码都写在这个特殊的函数包装内，那么外部就不能访问，除非你允许（变量前加上window，这样该函数后变量就成为全局）。各JavaScript库的代码也基本上是这种组织形式。
    总结一下，执行函数的作用主要为匿名和自动执行，代码在被解释时就已经在运行了。

    写法总结：
    (function(){ code  }());
    !function(){ code  }();
    ~function(){ code  }();
    -function(){ code  }();
    +function(){ code  }();

 * 到处一个自调用函数，让一个函数声明语句变成了一个表达式。
 * 优点 ：()和加减号在chrome表现惊人，而且在其他浏览器下也普遍很快，相比感叹号效果更好。
 */
export default (() => {
    window.$Hybrid = {}; // 声明一个window上的对象
    +function (global) {
        // 默认是安卓，主要用于判断是安卓还是ios
        global.$type = 'android';
        // 区分安卓和ios的不同调用方式
        global.$native = window.app;
        // 用于vue安装这个插件 这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象:
        global.install = function (Vue, options) {
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
        };
        // 主要用户初始化信息
        global.initType = function (params) {
            if (params == 'ios') {
                this.type = "ios";
            }
            console.log(this.type);
        };
        // 发送给原生的方法,...params : 这个参数就是一个数组
        global.send = function (...params) {
            console.log(params);
        };
        // 注册原生发过来的方法,name需要注册的方法的名字
        global.registerHandler = function (name, callBack) {
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
        };
        global.appGoBack = function (index) {
            console.log("原生调用封装类" + index);
            //调用$emit 方法, 来发送全局的函数
            this.$eventHub.$emit('goBack', index);
        }
    }(window.$Hybrid);
})();
