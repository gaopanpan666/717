## vue 
* ViewModel是Vue.js的核心，它是一个Vue实例。Vue实例是作用于某一个HTML元素上的，这个元素可以是HTML的body元素，也可以是指定了id的某个元素。
*
        <!--这是我们的View-->
        <div id="app">
            {{ message }}
        </div>
  script 中  
        // 这是我们的Model

        var exampleData = {
            message: 'Hello World!'
        }

        // 创建一个 Vue 实例也就是 "ViewModel"
        // 它连接 View 与 Model
        new Vue({
            el: '#app',
            data: exampleData
        })
* 定义View
* 定义Model
* 创建一个Vue实例或"ViewModel"，它用于连接View和Model
* 在创建Vue实例时，需要传入一个选项对象，选项对象可以包含数据、挂载元素、方法、模生命周期钩子等等。

* 在这个例子中，选项对象的el属性指向View，el: '#app'表示该Vue实例将挂载到<div id="app">...</div>这个元素；

* data属性指向Model，data: exampleData表示我们的Model是exampleData对象。

* Vue.js有多种数据绑定的语法，最基础的形式是文本插值，使用一对大括号语法，在运行时{{ message }}会被数据对象的message属性替换，所以页面上会输出"Hello World!"。
## 双向绑定

  在Vue.js中可以使用v-model指令在表单元素上创建双向数据绑定。
* < div id="app">
    <p>{{ message }}</p>

  < !--将message绑定到文本框-->
< input type="text" v-model="message"/>

  < /div>
  当更改文本框的值时，
  < p>{{ message }}< /p> 
  中的内容也会被更新。反过来，如果改变message的值，文本框的值也会被更新
* Vue实例的data属性指向exampleData，它是一个引用类型，改变了exampleData对象的属性，同时也会影响Vue实例的data属性。
## Vue.js的常用指令
 
* v-text
* v-show
* v-if
* v-else
* v-else-if
* v-for
* v-on
* v-bind
* v-modelv-text 

* v-text 
< span id="app2" v-text="msg">< /span>
< !-- < span>{{msg}}< /span>-->
js:
* //v-text
var example={
    msg:'hello word!'
}
new Vue({
    el:'#app2',
    data:example
})
* v-show

  根据表达式之真假值，切换元素的 display CSS 属性。

  当条件变化时该指令触发过渡效果。
< p id="app4"  v-show="local">这是一个v-show命令指令< /p>

* js:
var local=new Vue({
    el:'#app4‘，
    data：{
        local：true
  }
})
* v-if 
{{#if ok}}
  < h1>Yes< /h1>
{{/if}}
在 Vue.js ，我们使用 v-if 指令实现同样的功能：

< h1 v-if="ok">Yes< /h1>
也可以用 v-else 添加一个 “else” 块：

< h1 v-if="ok">Yes< /h1>
< h1 v-else>No< /h1>
< template> 中 v-if 条件组

因为 v-if 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 < template> 元素当做包装元素，并在上面使用 v-if，最终的渲染结果不会包含它。

< template v-if="ok">
  < h1>Title< /h1>
  < p>Paragraph 1< /p>
  < p>Paragraph 2< /p>
< /template>

* v-else

  v-else 元素必须紧跟在 v-if 元素或者 v-else-if的后面——否则它不能被识别。

< div v-if="Math.random() > 0.5">
  Sorry
< /div>
< div v-else>
  Not sorry
< /div>
 

* v-else-if

  v-if 的 else-if 块。可以链式的多次使用：
< div v-if="type === 'A'">
  A
< /div>
< div v-else-if="type === 'B'">
  B
< /div>
< div v-else-if="type === 'C'">
  C
< /div>
< div v-else>
  Not A/B/C
< /div>


* v-for

    基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名

* 基本用法：


* HTML：
< ul id="example-1">
  < li v-for="item in items">
    {{ item.message }}
  < /li>
< /ul>

* js:
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ]
  }
})


* v-on  
  绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

   用在普通元素上时，只能监听 原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

  在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event 属性： v-on:click="handle('ok', $event)"。

* v-bind 修饰符：

  .prop - 被用于绑定 DOM 属性。(what’s the difference?)
  .camel - transform the kebab-case attribute name into camelCase. (supported since 2.1.0)
* 用法：

  动态地绑定一个或多个特性，或一个组件 prop 到表达式。

  在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

  在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

  没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
* v-model ：表单控件绑定

  v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值