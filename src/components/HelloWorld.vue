<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showInfo()">原生调用js方法</button>
    <button @click="showParam('参数传递222')">原生调用js方法传递参数</button>
  </div>
</template>

<script>
import {hybrid} from '../common/app';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'vue 和 原生的交互测试'
    }
  },
  created() {
    hybrid.show = this.showInfo;
    hybrid.showp = this.showParam;
  },
  methods: {
    showInfo(){
      alert("提供给原生调用的方法");
    },
    showParam(p) {
      alert(p);
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
