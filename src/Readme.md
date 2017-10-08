# 个人信息

* 姓名： 高盼盼   
* 性别：男   
* 籍贯： 陕西省榆林市              
* 电话： 15711085064 
* 爱好： 喜欢打乒乓球，羽毛球，篮球，看励志书籍              



# **717项目框架** 

## **主要结构** 
* 4大页（首页=>分类=>购物车=>我的）
* 通过webpack生成项目目录、Vue-cli基本环境搭建，vue路由进行每个页面的跳转、vuex进行数据管理 axios来完成 ajax 请求
* 目录结构（node_modules是项目中安装的依赖模块 src文件夹，基本上文件都放在这里。 ——assets 资源文件夹，里面放一些静态资源 如 图片 ——components这里放的都是各个组件文件 ——main.js入口文件 ——routes这里放的是router.config.js文件 ——views放的是各个vue页面
## 下载所必须得依赖：
    
    npm install -g vue-cli它的作用就是生成一个webpack配置文件
     vue init webpack-simple hello-vue （hello-vue是自己定义的名字）会生成hello-vue一个目录
    npm install axios --save-dev   请求数据
    npm install vue --save-dev 下载vue
    npm install vue-router --save-dev  配置路由
    import axiosAdapter from "axios-mock-adapter"把所有axions的请求都拦截掉，返回数据
### **首页效果**
#### 首先搭建一个脚手架，在进行配置四个路由，让其点击就跳转到默认对应的页面
* 轮播、数据渲染商品列表、下拉刷新、添加到购物车、详情页、搜索页
* 轮播是利用swiper.js进行， 也可以用vue中自带的swiper插件，下载swiper后引用就可以
* swiper使用autoplay:2000来实现轮播自动播
* 数据渲染 利用axios.post()来请求数据，在请求数据的时候要注意穿的ID，把渲染商品放在一个vue里面方便操作，可以独立操作，不会相互影响。

* 在请求数据的时候给一个延时操作使用遮罩层和gif动态图或者c3样式实现动画。
* axios提供了一下几种请求方式——axios.request(config)

        axios.get(url[, config])

        axios.delete(url[, config])

        axios.head(url[, config])

        axios.post(url[, data[, config]])

        axios.put(url[, data[, config]])

        axios.patch(url[, data[, config]]) 在这里用的是axios.post(url[, data[, config]])
* 头部的搜索框，在聚焦的时候实现路由跳转，跳到搜索页 搜索页也是一个单独的vue 在他的里面会首先搜索本地localStorage.getItem() ,如果有值的话将他展现到页面并且存起来，在取值的时候将他转成对象，设置时候转成字符串。还应该有的效果是点击最近所搜的物品时应该跳到详细页 将物品展示出来。
* 在点击商品时要跳转到详细页（应该实现点击那个将那个展示）
* 点击购物车图标 商品加入到购物车页面:这里利用vue父子组件之间的通讯(props 或者 $emit)把商品的图片、url、价格、资料传递过来,进行渲染
* 在渲染商品是首先要引入axios 然后使用onPost引入json 数据 然后再使用@scroll 下面监听事件判断滚动的高度，并且在页面添加一个div 做login...下拉加载中的效果   去实现加载过程
判断滚动的高度来实现login...的显示隐藏

## 配置路由：
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)


## 分类：
* 
    首先用于请求后台模拟数据，进行交互，把数据渲染到页面点击选项的时候，后台数据变换到跟点击对象的商品一致，在这之前会有一个遮罩层来来进行实现实现延时操作
    在钩子内设置一个路由拦截，并请求后台接口，数据请求完成后，根据数据渲染分类菜单，点击每个分类，改变当前的路由参数，处理路由参数，渲染对应分类里的商品
## 购物车：
* 接收首页点击传过来的数据，根据数据来判断是几个，而且是什么商品，在通过计算可以知道数量和总价钱的一个计算
* 商品也是单独vue组件引进来 避免价格加减时影响(加减)
* <1>购物车为空 => 去逛逛 跳转至首页 => 添加商品 （添加的商品通过首页传递在此接收数据 渲染）
* <2>点击编辑 结算按钮变成删除 
* <3>点击删除 结算按钮变成完成 选中按钮进行计算价格
*  购物车---添加删除功能
* 添加删除：在编辑所在的span标签上绑定click事件，用一个变量改变span的内容，用于切换编辑和删除的状态。
    this.$http.post("/cart/list",{token:token()}).then((res)=>{
        //let shop_list=res.data;//localStroage中的购物车列表
        //console.log(this.updated_cart)
        this.list=res.data

    })
}
    }


## 我的：
 * 登陆
    首先会进行一个判断是否登陆 如果有的话就将我的页展示 否则跳转登陆页 在后台进行登录信息验证，返回对应信息，并在成功时将登录信息保存到cookie中
    //登陆
        logined() {
                    this.$http.post("/isLogin", {
                        phone: this.login_phone,
                        pass: this.login_pass
                    }).then((res) => {
                        console.log(res)
                        if(res.status==200){
                            document.cookie="1505B="+res.data.tocken;
                            this.$router.push({name:'mine'})
                        }else{
                            console.log(res[1])
                        }
                    })
                }
 * 注册  
    用户注册时，首先验证信息填写是否正确，正确则发送后台请求，将注册信息发送，否则提示用户信息错误
    后台将注册信息保存到本地存储中，用于登录时的验证
    /注册模拟发送数据
            this.$http.post("/register", {
                phone: this.phone_number,
                pass: this.password
            }).then((res) => {
                if (res.status == 200) {
                    this.is_login = true
                }
            })
        }
        //mock.js
        mocker.onPost("/register").reply(function (config) {
            let data = JSON.parse(config.data);
            let ls = window.localStorage;
            let arr = [];
            if (!ls.getItem("keys")) {
                arr.push(data)
            } else {
                arr = JSON.parse(ls.getItem("keys"))
                arr.push(data)
            }
            ls.setItem("keys", JSON.stringify(arr))
            return [200, "注册成功"]
        })
### 收货地址： 
* 首先获取数据库的数据将地址渲染 点击新增地址跳转到添加地址页
*  在地址页进行地址的添加 在这之前会有一个遮罩层进行延时加载 点击保存时 会进行一个判断 判断手机号格式 点击保存会跳转至收货地址页 将刚才输入的内容添加到后台数据中 并将其渲染到收货地址页


## 项目git地址：
