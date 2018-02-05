/**
 * 封装和原生（ios和android）的交互类，
可以在vue的类中访问交互，方法挂载到window上工给原生调用
 */ 
var hybrid = {
    // 默认是安卓，主要用于判断是安卓还是ios
    type: 'android',
    // 区分安卓和ios的不同调用方式
    native = window.app,
    // 用于vue安装这个插件
    install (Vue) {
        // 我们也可以在install里面执行其他函数，Vue会将this指向我们的插件
        console.log(this);  // {install: ...,utils: ...}
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
    }
}

// 把vue中绑定的对象挂载到window上
window.Hybrid = hybrid;
if (window.Vue) { // 自动绑定
    window.Vue.use(hybrid);
}
// 导出共给vue组件中引入使用
export {hybrid}