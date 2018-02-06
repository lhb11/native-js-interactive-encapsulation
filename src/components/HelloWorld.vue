<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showInfo()">原生调用js方法</button>
    <button @click="showParam('参数传递222')">原生调用js方法传递参数</button>
    <router-link to="sec">测试销毁</router-link>
    <button v-my-directive:foo.a.b="mymsg"></button>
    <div v-my-directive="{color: 'blue', text: '测试指令!'}"></div>
    <button @click="changeDirective()">修改指令绑定的对象</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'vue 和 原生的交互测试',
      mymsg: {color: 'green', text: '我是自定义指令的value!'}
    }
  },
  created() {
    console.log(this.message); // 获取app中mixin合并的内容
    this.$myMethod(this); // 调用app中挂载到vue的全局函数
    // 监听app中发出的事件
    this.$eventHub.$on('goBack', (index)=>{
      this.goBack(index); // 调用组件内容函数处理
    });
  },
  methods: {
    showInfo(){
      alert("提供给原生调用的方法");
      // 调用app中的返回函数，模拟原生调用
      this.$hybrid.appGoBack(10);
    },
    showParam(p) {
      alert(p);
    },
    goBack(index) {
      console.log('组件之内的返回事件' + index);
    },
    changeDirective() {
      this.mymsg.color = 'orange';
      this.mymsg.text = '修改指令内容';
    }
  },
  destroyed () {
    console.log('移除监听的事件');
    // 在组件销毁时移除监听事件
    this.$eventHub.$off('goBack');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
