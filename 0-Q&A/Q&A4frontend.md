# 前端面试题参考
- https://juejin.cn/post/6844904116339261447
- https://juejin.cn/post/6905294475539513352
- https://www.nowcoder.com/contestRoom?mutiTagIds=644
- https://github.com/sudheerj/javascript-interview-questions
- https://github.com/KieSun/all-of-frontend
- https://juejin.cn/post/6895752757534261256
- 注意：该文件集中存放题目与代码实例，概念理解请到其他相关的文件

# 简历
https://juejin.cn/post/6844903879973273607

如果去现场面试，一定要记得带上笔和简历。
建议大家在投递简历时可以先投递一些试水的小公司，先检验一下自己是不是可以胜任这些公司的面试。
如果没有听懂面试题可以试着询问面试官，您要问的是关于xxx的问题么
如果面试官问的某项技术自己在某些场景使用过或看到别的场景有使用，可结合这些场景进行讲解（让面试官知道你不仅仅理解它，你还会很好的使用它）
如果是Vue技术栈希望可以深入源码或者至少理解一些别人的源码分析


# HTML
- 首屏加载优化（https://blog.csdn.net/weixin_34414196/article/details/91480981）
- canvas和svg（https://www.zhihu.com/question/19690014）
- 如何避免回流和重绘 
- HTML5页面的离线储存(https://juejin.cn/post/6905294475539513352#heading-17)
- 网页乱码（https://juejin.cn/post/6905294475539513352#heading-25）
# CSS

## 1px问题
https://juejin.cn/post/6905539198107942919#heading-58

## 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？
- https://juejin.cn/post/6905539198107942919#heading-19

## 单行、多行文本溢出隐藏
- https://juejin.cn/post/6905539198107942919#heading-26

## 选择器与优先级
```
!important
内联样式style=""
ID选择器#id
类选择器/伪类选择器/属性选择器.class.active[href=""]
元素选择器/伪元素选择器/关系选择器html+div>span::after
通配符选择器*
默认与继承的属性
```

## CSS3新特性
```
word-wrap 文字换行
text-overflow 超过指定容器的边界时如何显示
text-decoration 文字渲染
text-shadow文字阴影
gradient渐变效果
transition过渡效果 transition-duration：过渡的持续时间
transform拉伸，压缩，旋转，偏移等变换
animation动画
```

### CSS画圆半圆扇形三角梯形
```css
/* 圆形 */
div{
    margin: 50px;
    width: 100px;
    height: 100px;
    background: red;
}
.circle {
    border-radius: 50%;
}
/* 半圆 */
.half-circle{
    height: 50px;
    border-radius: 50px 50px 0 0;
}
/* 三角：实际上边框并不是四个方向的矩形，而是四个方向的三角形。设置某一边有颜色，其他边transparent透明后，可以看到 */
.triangle{
    width: 0px;
    height: 0px;
    background: none;
    border: 50px solid;
    border-color: red transparent transparent transparent;
}
/* 扇形：三角加圆角边框 */
.sector{
    width: 0;
    height: 0;
    border: 100px solid transparent;
    border-radius: 100px;
    border-top-color: red;
}
/* 梯形 */
.ladder{
    width: 50px;
    height: 0px;
    background: none;
    border: 50px solid red;
    border-color: red transparent transparent transparent;
}

```

### 视窗宽高相关的属性


### 两栏布局：左侧宽度固定，右侧宽度自适应的布局
```html
<div class="box">
  <div class="box-left"></div>
  <div class="box-right"></div>
</div>

<!-- float + margin -->
.box {
 height: 200px;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  float: left;
  background-color: blue;
}

.box-right {
  margin-left: 200px;
  background-color: red;
}

<!-- calc -->
.box {
 height: 200px;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  float: left;
  background-color: blue;
}

.box-right {
  width: calc(100% - 200px);
  float: right;
  background-color: red;
}

<!-- BFC: float + overflow -->
.box {
 height: 200px;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  float: left;
  background-color: blue;
}

.box-right {
  overflow: hidden;
  background-color: red;
}

<!-- flex -->
.box {
  height: 200px;
  display: flex;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  background-color: blue;
}

.box-right {
  flex: 1; // 设置flex-grow属性为1，默认为0
  overflow: hidden;
  background-color: red;
}

```

### 三栏布局（左右宽度固定、中间自适应）
- flex实现：左右width固定、中间flex: 1 1 auto自适应

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            display: flex;
            height: 100vh;
        }
        .left, .right {
            width: 200px;
            background-color: pink;
        }
        .center {
            flex: 1 1 auto;
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <div class="box">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
</body>
</html>
```

- 圣杯布局实现（感觉略麻烦）：利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .outer {
            height: 100px;
            padding-left: 100px;
            padding-right: 200px;
        }
        .center {
            float: left;
            width: 100%;
            height: 100px;
            background: lightgreen;
        }
        .left {
            position: relative;
            left: -100px;
            float: left;
            margin-left: -100%;
            width: 100px;
            height: 100px;
            background: tomato;
        }
        .right {
            position: relative;
            left: 200px;
            float: right;
            margin-left: -200px;
            width: 200px;
            height: 100px;
            background: gold;
        }

    </style>
</head>
<body>
    <div class="outer">
        <div class="center"></div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>
</html>
```

- 双飞翼布局实现（也很麻烦，估计和圣杯布局一样是属于传统布局方案）：双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元素的 padding 来实现的。本质上来说，也是通过浮动和外边距负值来实现的。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .outer {
            height: 100px;
        }
        .left {
            float: left;
            margin-left: -100%;
            width: 100px;
            height: 100px;
            background: tomato;
        }
        .right {
            float: left;
            margin-left: -200px;
            width: 200px;
            height: 100px;
            background: gold;
        }
        .wrapper {
            float: left;
            width: 100%;
            height: 100px;
            background: lightgreen;
        }
        .center {
            margin-left: 100px;
            margin-right: 200px;
            height: 100px;
        }

    </style>
</head>
<body>
    <div class="outer">
        <div class="wrapper">
            <div class="center"></div>
        </div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>
</html>
```

### 说说svg和canvas各自的优缺点
```
共同点：都是有效的图形工具，对于数据较小的情况下，都很又高的性能，它们都使用 JavaScript 和 HTML；它们都遵守万维网联合会 (W3C) 标准。
svg优点：
矢量图，不依赖于像素，无限放大后不会失真。
以dom的形式表示，事件绑定由浏览器直接分发到节点上。
svg缺点：
dom形式，涉及到动画时候需要更新dom，性能较低。

canvas优点：
定制型更强，可以绘制绘制自己想要的东西。
非dom结构形式，用JavaScript进行绘制，涉及到动画性能较高。
canvas缺点：
事件分发由canvas处理，绘制的内容的事件需要自己做处理。
依赖于像素，无法高效保真，画布较大时候性能较低。
```

### 进度条中间有一串文字，当进度条覆盖了文字之后，文字要与进度条反色，怎么实现？
```markup
js的方案，在进度条宽度变化的时候，计算盖过每一个文字的50%，如果超过，设置文字相反颜色。
当然css也有对应的方案，也就是 mix-blend-mode，我并没有接触过。
对应html也有对应方案，也就设置两个相同位置但是颜色相反的dom结构在重叠在一起，顶层覆盖底层，最顶层的进度条取overflow为hidden，其宽度就为进度。
```

### tooltip的实现
https://www.jianshu.com/p/fdfa8058a015

### 抛物线运动效果
https://www.zhangxinxu.com/wordpress/2018/08/css-css3-%e6%8a%9b%e7%89%a9%e7%ba%bf%e5%8a%a8%e7%94%bb/

## 移动端适配
https://juejin.cn/post/6844904117819850765#heading-17
https://juejin.cn/post/6847902224740253709
https://juejin.cn/post/6844903712003997704
https://juejin.cn/post/6884042902587047943
https://juejin.cn/post/6953091677838344199#heading-13
https://juejin.cn/post/6844903845617729549#heading-46

## postcss
https://juejin.cn/post/6844904117819850765#heading-19

### 层叠顺序
https://juejin.cn/post/6844903667175260174

### 居中

```html
<!DOCTYPE html>
<html>
<head>
  <title>title</title>
  <style type="text/css">
    .out {
      width: 600px;
      height: 300px;
      background: grey;

      /*方法一：父元素设置flex布局，即使子元素浮动也可以使用*/
/*      display: flex;
      justify-content: center;
      align-items: center;*/

      /*方法三：子绝父相，即使子元素浮动也可以使用*/
      /*position: relative;*/
    }
    .in {
      width: 100px;
      height: 100px;
      background: skyblue;
      /*让行内元素或文字居中*/
/*      text-align: center;
      line-height: 100px;*/

      /*方法二：不脱离标准流，子元素分别设置水平居中和垂直居中（先下移父元素高度的一半，再上移自身高度的一半）*/
/*      margin: 0 auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);*/

      /*方法三：子绝父相*/
/*      position: absolute;
      margin: auto;
      top: 0; bottom: 0; left: 0; right: 0;*/
    }
  </style>
</head>
<body>
  <div class="out">
    <div class="in"><span>文字</span></div>
  </div>
</body>
</html>
```

### BFC、清除浮动、外边距塌陷
- [MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
- 定义：块格式化上下文是可视CSS渲染的一部分，是块盒子的布局过程发生的区域。
- 触发：
  - 使用 `display: flow-root` 可以创建无副作用的BFC，要兼容IE或display被占用的话可以改成`overflow:auto`；
  - 脱离默认文档流：设置浮动、设置FLEX布局、设置GRID布局、设置display为表格相关的值或inline-block
- BFC的约束规则

```
内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）
处于同一个BFC中的元素相互影响，可能会发生外边距重叠
每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
浮动盒区域不叠加到BFC上
```
- 作用：可以BFC内的元素的样式布局符合规范，解决类似字体环绕、自适用两列布局（float + overflow）、清除浮动和外边距塌陷等问题
- 清除浮动：
  - 让浮动元素的父元素成为BFC,例如设置`display: flow-root`
  - 浮动元素的父元素添加after伪元素清除浮动
  - 隔墙法：添加一个div清除浮动

```html
<!DOCTYPE html>
<html>
<head>
  <title>test</title>
  <style type="text/css">
    .wrapper{
      border: 1px solid red;
      /*让父元素触发BFC也可以清除浮动，例如添加display: flow-root*/
    }
    .wrapper::after {
        content:"";
        display: block;
        clear: both;
    }
    .content{
      width: 100px;
      height: 100px;
      border: 1px dotted black;
    }
    .left {
      float: left;
    }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="content left"></div>
</div>
<div style="clear: both; height: 20px;"></div>
<div class="content"></div>
</body>
</html>
```

- 解决外边距塌陷

```html
<!DOCTYPE html>
<html>
<head>
  <title>title</title>
  <style type="text/css">
    /*定义：在CSS中，两个或多个毗邻的普通流中的盒子（可能是父子元素，也可能是兄弟元素）在垂直方向上的外边距会发生叠加，称之为外边距叠加。*/
    /*父子元素外边距塌陷：子元素设置外边距会影响到父元素*/
    .out {
      background: grey;
      /*display: flow-root;*/

      /* 还可以通过增加边框解决 */
      /* border: 1px solid transparent; */
    }
    .in {
      width: 100px;
      height: 100px;
      background: black;
      margin-top: 100px;
    }

    /*兄弟外边距塌陷：相邻的外边距会发生折叠*/
    .top, .bottom {
      border: 1px dotted black;
      width: 100px;
      height: 100px;
      margin: 100px 0;
    }
    .bottom-wrapper {
      display: flow-root;
    }
  </style>
</head>
<body>
  <div class="out">
    <div class="in"></div>
  </div>

  <hr>

  <div class="top"></div>
  <!-- <div class="bottom-wrapper"> -->
    <div class="bottom"></div>
  <!-- </div> -->
</body>
</html>
```

### 陌生属性
- vertical-align：用来指定行内元素（例如一行文字中的小图标的垂直位置）或表格单元格元素的垂直对齐方式。[详见MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)


# JS

## web worker

## 如何规避javascript多人开发函数重名问题

## 考察内置对象：History对象、location对象、Navigator对象

## WebSocket

### 如何判断两个变量相等
提示：这里需要分基本类型和引用类型，Object.is

### 0.1+0.2!=0.3怎么处理
```
把需要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，等计算完成后再进行降级（除以10的n次幂），即：
(0.1*10 + 0.2*10)/10 == 0.3 //true
```

### 数组去重（实现复杂数据(去重元素是对象，数组)的数组去重）
https://xieyufei.com/2017/09/02/JS-Array-Remove-Duplicate.html

## JS单例
https://zhuanlan.zhihu.com/p/113456049

### 实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置。

```js
const box = document.getElementById('box');
function isIcon(target) {
  return target.className.includes('icon');
}

box.onclick = function(e) {
  e.stopPropagation();
  const target = e.target;
  if (isIcon(target)) {
    target.style.border = '1px solid red';
  }
}
const doc = document;
doc.onclick = function(e) {
  const children = box.children;
  for(let i; i < children.length; i++) {
    if (isIcon(children[i])) {
      children[i].style.border = 'none';
    }
  }
}
```

### 图片懒加载怎么实现

## this、call、bind、apply

## 实现一个大文件上传和断点续传
https://juejin.cn/post/6844904046436843527

## 性能优化
```
使用CDN
gzip压缩
文本压缩
合并请求
雪碧图
图片懒加载
缓存资源
减少DOM操作
```
https://juejin.cn/post/6981673766178783262#heading-1

## JS混淆与压缩

## JS测试框架
- mocha（https://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html）

## 富文本编辑器
- https://juejin.cn/post/6844903871110709256
- https://juejin.cn/post/6844903555900375048
- https://zhuanlan.zhihu.com/p/90931631

## Promise
https://es6.ruanyifeng.com/#docs/promise


- 使用promise封装ajax
  
```
// promise 封装实现：
function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}

```

### 事件循环
https://segmentfault.com/a/1190000022805523

### 闭包
https://segmentfault.com/a/1190000023356598

### 单例

### 代码性能测试（代码运行时间计算）
- 循环测试

```js
// 前言：for...in循环输出key值，for...of循环输出value值。但是for...of循环不可以直接遍历对象，需要先通过Object.keys()或values()转换成数组
// 循环性能测试结论：for循环执行速度最快
let arr = [];
for(let i=0;i<2000000;i++){ arr.push(i); }
// for...in循环
console.time("timer");
for (let index in arr) { }
console.timeEnd("timer");
// for...of循环
console.time("timer");
for (let index of arr) { }
console.timeEnd("timer");
// for循环
console.time("timer");
for(let index=0; index<arr.length; index++){ }
console.timeEnd("timer");
// while循环
console.time("timer");
let index = 0;
while (index < arr.length) {
  index ++;
}
console.timeEnd("timer");
```

### 深拷贝
- 参考：https://segmentfault.com/a/1190000020255831
- 要求：支持数组、Date、正则、循环引用、性能优化
- 代码：

```js
// 支持数组、Date、正则、循环引用，暂无性能优化
function clone(target, map = new WeakMap()) {
  // 当null NaN undefined number string等基本数据类型时直接返回
  // 注意typeof 函数为function，所以直接返回也解决了函数类型的问题
  if (target === null || typeof target !== 'object') {
    return target
  }
  // Date类型
  if (target instanceof Date) {
    const copy = new Date()
    copy.setTime(target.getTime())
    return copy
  }
  // 正则类型类型
  if (target instanceof RegExp) {
    const Constructor = target.constructor
    return new Constructor(target)
  }
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    // 通过map解决循环引用的问题
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
        cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
};

const arr = [
  { a: new Date(), aa: new RegExp('\\w+'), aaa: function() { console.log('aaa function') } }, 
  { b: '' }, 
  { c: [null, undefined, NaN] }, 
  { d: [{ da: 1, db: { dba: 123 }}] }
]
arr[1].b = arr;
console.log(arr)
console.log(clone(arr))
```

### 手写防抖与节流
https://mp.weixin.qq.com/s/fNrn94emmLMfuKN_Ukpi6A
https://segmentfault.com/a/1190000023425946

```js
// 防抖 debounce
function debounce (fn,delay){
  let timer = null;
  return function (...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}

// 滚动防抖
function debounce(fn,delay){
  let timer = null;
  return function() {
      if(timer){ clearTimeout(timer) }
      timer = setTimeout(fn,delay);
  }
}
function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log('滚动条位置：' + scrollTop);
}
window.onscroll = debounce(showTop, 1000);

// 节流 throttle
function throttle (fn,delay){
    let start = Date.now();
    return function(...args){
        if(Date.now()-start>=delay){
            start = Date.now;
        }
        fn.apply(this,args)
    }
}
```

## ES6
### 继承的多种方式

## 正则

# VUE


## Vue-Router
- Vue-Router 的懒加载如何实现

```
<!-- 非懒加载 -->
import List from '@/components/list.vue'
const router = new VueRouter({
  routes: [
    { path: '/list', component: List }
  ]
})
<!-- 方案一：箭头函数 -->
const List = () => import('@/components/list.vue')
const router = new VueRouter({
  routes: [
    { path: '/list', component: List }
  ]
})
```

## Vue3
- 对比React（https://juejin.cn/post/6844904132109664264）

## mvc和mvvm理解

## 组件设计
https://juejin.cn/post/6844903917470351367#heading-65

## 组件通讯
https://juejin.cn/post/6844903887162310669

### 自定义指令懒加载
https://mp.weixin.qq.com/s/36oBZMd-m-2k5EKPghfG3A

### 简单实现一个Virtual DOM
https://mp.weixin.qq.com/s/w2b9Wn7QWXhy2qf2JX3Kbw

### 简单实现双向绑定（数据响应）
https://juejin.cn/post/6844904088119853063

### Virtual Dom 的优势在哪里？
「Virtual Dom 的优势」其实这道题目面试官更想听到的答案不是上来就说「直接操作/频繁操作 DOM 的性能差」，如果 DOM 操作的性能如此不堪，那么 jQuery 也不至于活到今天。所以面试官更想听到 VDOM 想解决的问题以及为什么频繁的 DOM 操作会性能差。
首先我们需要知道：
DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程）
JS 代码调用 DOM API 必须 挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化，
引擎间切换的单位代价将迅速积累若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。
其次是 VDOM 和真实 DOM 的区别和优化：

虚拟 DOM 不会立马进行排版与重绘操作
虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多DOM节点排版与重绘损耗
虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

# axios
axios拦截器怎么配?
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

```

# React

# Webpack
- Node.js的加载机制（require和module.exports）
- HMR怎么配置？浏览器如何更新，如何不刷新自动更新？（https://github.com/Jocs/jocs.github.io/issues/15）
- mock转发代理怎么配置？怎么拦截转换？
- plugin和loader的编写、顺序？
- 打包构建优化：速度与体积
### common.js 和 es6 中模块引入的区别
CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。运行在浏览器端的 JavaScript 由于也缺少类似的规范，在 ES6 出来之前，前端也实现了一套相同的模块规范 (例如: AMD)，用来对前端模块进行管理。自 ES6 起，引入了一套新的 ES6 Module 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对 ES6 Module 兼容还不太好，我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CommonJs 是单个值导出，ES6 Module可以导出多个
CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined

# HTTP与HTTPS
- 浏览器渲染（从输入url到页面渲染的完成过程）
- 缓存（https://juejin.cn/post/6844904153043435533）（https://juejin.cn/post/6844903757872889870）
- HTTPS（https://juejin.cn/post/6847902222764736520）（https://juejin.cn/post/6844903830916694030）
- 响应状态码（https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status）
- 网络协议TCP/UDP（https://juejin.cn/post/6844903800336023560）（https://zhuanlan.zhihu.com/p/24860273）
- 跨域（CORS、JSONP、服务器代理）
  - https://www.ruanyifeng.com/blog/2016/04/cors.html
  - https://mp.weixin.qq.com/s/y8e1HLNzbLLYWSeMnT-xSA?st=1D25A7399590529BF53EDF4518411B98CC335E861EFD43676B36CB3CB83215A12362C9747F13732DE38D12880F77BAF536CB18EDBBCD55A2B417C83235157002FC726E60B98219D81438CB10917B73E42E29E82967A7EE6AAF27637D88377D191DAE653066B93114955CF4ED30728E627BE522F05D2AD0E4B83C41287CC571460C8F98A83240549803ABD38042B0CBC418DFCAC638101B2661CF345E9BC542BF8EDFEEF15D8116EEB3F87ACDA736CA40B7AEF1390A94C9C87F31CFA1F0F8CF44&vid=1688852668549777&cst=63306DF15C6334F871367E3229C1369CDEAB7528E6D283ECA057BE7FB3F3240CE3A90713E8803CC3D73D8BC1E5FB19D1&deviceid=b89ae41b-cb57-4ff7-943d-0388234b094b&version=3.1.18.6007&platform=win
  - https://juejin.cn/post/6844903873400799240


### 一个 tcp 连接能发几个 http 请求？
如果是 HTTP 1.0 版本协议，一般情况下，不支持长连接，因此在每次请求发送完毕之后，TCP 连接即会断开，因此一个 TCP 发送一个 HTTP 请求，但是有一种情况可以将一条 TCP 连接保持在活跃状态，那就是通过 Connection 和 Keep-Alive 首部，在请求头带上 Connection: Keep-Alive，并且可以通过 Keep-Alive 通用首部中指定的，用逗号分隔的选项调节 keep-alive 的行为，如果客户端和服务端都支持，那么其实也可以发送多条，不过此方式也有限制，可以关注《HTTP 权威指南》4.5.5 节对于 Keep-Alive 连接的限制和规则。
而如果是 HTTP 1.1 版本协议，支持了长连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限；
同样，如果是 HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送

### cookie token 和 session 的区别
这道题绝对不是你回答的点越多就越好。这道题考察的是你对浏览器缓存知识的理解程度，所以你应该回答的是 Cookie、 Session、Token 的产生背景、原理、有什么问题，在回答这个的基础上把差别讲出来。把这些东西答出本质，再加点装逼的东西，再故意拓展讲到你准备的其他内容才是答好这道题的关键，而要理解好这些东西，其实一两天就够了。关于 Cookie，最近还发生了 Chrome80 屏蔽第三方 Cookie 的事件，如果真的问到这个问题，讲到这件事情妥妥的加分项，前提是你对这件事情也有比较深入的了解。关于 Cookie 和这件事情 我写了篇文章 github.com/mqyqingfeng…  可以看一下。

### 如何选择图片格式，例如 png, webp
图片格式、压缩方式、透明度、动画、浏览器兼容、适应场景
JPEG、有损压缩、不支持、不支持、所有、复杂颜色及形状、尤其是照片
GIF、无损压缩、支持、支持、所有、简单颜色，动画
PNG、无损压缩、支持、不支持、所有、需要透明时
APNG、无损压缩、支持、支持、FirefoxSafariiOS Safari、需要半透明效果的动画
WebP、有损压缩、支持、支持、ChromeOperaAndroid ChromeAndroid Browser、复杂颜色及形状浏览器平台可预知
SVG、无损压缩、支持、支持、所有（IE8以上）、简单图形，需要良好的放缩体验需要动态控制图片特效

# WEB安全
- XSS (https://juejin.cn/post/6844904179182354439)
- CSRF(https://juejin.cn/post/6844904180918779918)

# 算法

# 综合
可视化的项目
文件上传的二进制具体是怎么处理的
Chrome插件如何屏蔽广告
抓包：https://juejin.cn/post/6844903590910263309
## 题目参考1
-  Vue自定义指令懒加载：https://mp.weixin.qq.com/s/36oBZMd-m-2k5EKPghfG3A
-  实现Promise，Promise.all, Promise.allSettled
-  手写ES6的继承
-  实现一个vue的双向绑定：https://juejin.cn/post/6844904088119853063
-  webpack
   -  webapck的HMR，怎么配置：https://github.com/Jocs/jocs.github.io/issues/15
   -  webpack怎么配置mock转发代理，mock的服务，怎么拦截转换的
   -  webapck的plugin和loader的编写， webapck plugin和loader的顺序
   -  webpack的打包构建优化，体积和速度
- HTTP
  - 缓存（强缓存），如何设置缓存：https://juejin.cn/post/6844904153043435533
  - 简单请求和复杂请求：https://juejin.cn/post/6844903873400799240
  -  HTTPS的整个详细过程：https://juejin.cn/post/6844903830916694030
  -  响应码：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
  -  TCP和UDP的区别：https://juejin.cn/post/6844903800336023560
- CSS
  - tooltip的实现：https://www.jianshu.com/p/fdfa8058a015
  - 抛物线动画：https://www.zhangxinxu.com/wordpress/2018/08/css-css3-%e6%8a%9b%e7%89%a9%e7%ba%bf%e5%8a%a8%e7%94%bb/
## 题目参考2
- HTML标签的相关操作判断题目：https://mp.weixin.qq.com/s/MtHUsWtGQ8k8mxl9oR8_xA
- 实现一个Virtual DOM：https://mp.weixin.qq.com/s/w2b9Wn7QWXhy2qf2JX3Kbw
- 小功能：
  - `实现带搜索历史和模糊搜索的搜索框：https://www.nowcoder.com/test/question/done?tid=48856751&qid=141039#summary`
  - `实现带以下功能的图片上传弹窗组件：https://www.nowcoder.com/test/question/done?tid=48856549&qid=141005#summary`
  - `红包模拟器：https://www.nowcoder.com/test/question/done?tid=48856796&qid=140947#summary`

# 技术外问题
- 你为什么要离开上一家公司？
- 遇到过什么困难，怎么解决？
- 说一下你上一家公司的一个整体研发发布流程吧？
- 你说一下你的技术有什么特点
- 说一下你觉得你最得意的一个项目？你这个项目有什么缺陷，弊端吗？
- 现在有那么一个团队，假如让你来做技术架构，你会怎么做？
- 说一下你上一家公司的主要业务流程，你参与到其中了吗？
- 你觉得你最擅长什么
- Low Code如果真的做出来了，都没前端什么事情了，那你干嘛去？顺着这个问题他还问我未来的前端应该怎么发展？未来前端有哪些可以挖掘的点？
- 以前公司的岗位制度是什么样
- 你现在的岗位等级情况、你的绩效情况、
- 你领导对你的评价是怎么样的、领导是不是经常找你沟通
- 你未来对于你的职业有什么规划
- 你觉得你做的最有成就感的一件事
- 你一般解决问题的方法有哪些
- 你期望的薪资待遇是多少
