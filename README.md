# 前言

> vue和原生（ios和android）的交互封装
  主要在项目中使用到vue和原生的交互，原生交互的方法必须挂载到window上，引入vue的作用域，挂载到vue的方法原生无法访问到，所以写一个app.js来完成原生和js的交互

## 说明

>  喜欢的别忘记了可以star一下的噢！  

>  开发环境 win10  Chrome 58.0.3029.110  nodejs 6.2.0 

## 技术栈

> vue + vue-router + webpack

## 效果图
## 原生调用组件中的事件演示
<img src="https://github.com/lhb11/native-js-interactive-encapsulation/screenshots/native.gif"/>

## 回掉原生事件演示
<img src="https://github.com/lhb11/native-js-interactive-encapsulation/screenshots/back.gif"/>


## 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```