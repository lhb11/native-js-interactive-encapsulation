<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showInfo()">原生调用js方法</button>
    <button @click="showParam('参数传递222')">原生调用js方法传递参数</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '我是路由的第二个页面，测试销毁事件'
    }
  },
  created() {
    // this.hybrid.show = this.showInfo;
    // this.hybrid.showp = this.showParam;
    console.log(this.message);
    this.$eventHub.$on('goBack', (index)=>{
      this.goBack(index);
    });
  },
  methods: {
    showInfo(){
      alert("提供给原生调用的方法");
      this.$hybrid.appGoBack(10);
    },
    showParam(p) {
      alert(p);
    },
    goBack(index) {
      console.log('组件之内的返回事件' + index);
    }
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