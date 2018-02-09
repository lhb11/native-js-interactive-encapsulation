import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Sec from '@/components/Sec'

Vue.use(Router)

const routers =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sec',
      name: 'Sec',
      component: Sec
    }
  ]
})

routers.beforeEach((to, from, next) => {
//   console.log(to.path + '---' + from.path);
// debugger
//   const dd =  decodeURIComponent(to.path)
//   console.log(to.query);
//   console.log(dd);
  next();
})

routers.afterEach((to, from) => {
  // ...
})

export default routers;


