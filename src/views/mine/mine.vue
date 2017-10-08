<template>
  <div class="mine_app">
      <header class="mine_head">
         <i class="icon iconfont icon-settings"></i> 
         <h2>我的食品商城</h2>  
      </header>
      <section class="main">
        <div class="mine_info">
            <img src="../../images/mine.png" alt="">
            <p>8008208820547k</p>
        </div>
      <div class="mine_shop">
          <i class="icon iconfont icon-shop"></i>
          <span>我的店铺</span>
          <a href="javascript:;">></a>
      </div>
      <div class="mine_nav">
          <ul>
            <li><i class="icon iconfont icon-home"></i>代付款</li>
            <li><i class="icon iconfont icon-apps"></i>代发货</li>
            <li><i class="icon iconfont icon-message"></i>代收货</li>
            <li><i class="icon iconfont icon-form"></i>售后</li>
            <router-link :to="{name:'myorder'}" tag="li"><i class="icon iconfont icon-search"></i>我的订单></router-link>
          </ul>
      </div>
      <p class="pp"></p>
      <div class="mine_list">
          <ul>
            <li><i class="icon iconfont icon-home"></i>我的社区<a href="javascript:;">></a></li>
            <li><i class="icon iconfont icon-home"></i>账户余额<a href="javascript:;">></a></li>
           <li @click="ad"><i class="icon iconfont icon-home"></i>地址管理<a href="javascript:;">></a></li>
          </ul>
      </div>
      <div class="pp"></div>
      <h4>热门推荐</h4>
      <p class="pp"></p>
      <div class="mine_content">
           <dl>
               <dt>
                   <img src="../../images/food2.jpg" alt="">
               </dt>
               <dd>
                   <p>大黄鸭 正宗土特产大黄鸭 正宗土特产大黄鸭 正宗土特产</p>
                   <span>￥300</span>
                   <i class="icon iconfont icon-cart"></i>
               </dd>
           </dl>
           <dl>
               <dt>
                   <img src="../../images/food2.jpg" alt="">
               </dt>
               <dd>
                    <p>大黄鸭 正宗土特产大黄鸭 正宗土特产大黄鸭 正宗土特产</p>
                    <span>￥300</span>
                    <i class="icon iconfont icon-cart"></i>
               </dd>
            </dl>
      </div>
    </section>
  </div>

</template>
<script>
export default {
     methods:{
        ad(){
            this.$router.push("/site")
        }
     }
}
</script>
<style>
  .mine_app{
    display: flex;
    flex-direction:column;
  }
  .main{
    flex:1;
    overflow-y:scroll;
  }
  .pp{
    width: 100%;
    height: 10px;
    background: #f0f0f0;
  }
  h4{
    text-align: center;
    line-height: 40px;
  }
  .mine_head{
    width: 100%;
    height: 40px;
    position: relative;
    border-bottom: .5px solid #ccc;

  }
  .mine_head i{
    position: absolute;
    left: 10px;
    top: 8px;
  }
  .mine_head h2{
    font-weight: normal;
    line-height: 40px;
    text-align: center;
    font-size: .3rem;

  }
  .mine_info{
    width: 100%;
    height: 2rem;
    background: #FC6741;
    text-align: center;
  }
  .mine_info img{
    margin-top: 10px;
    width: 60px;
    height: 60px;

  }
  .mine_info p{
    color: #fff;
    font-size: .3rem;
  }
  .mine_shop{
    width: 100%;
    height: 1.2rem;
    position: relative;
    border-bottom: .5px solid #ccc;
  }
  .mine_shop i{
    display: inline-block;
    font-size: .5rem;
    /*line-height: 1.2rem;*/
    margin-left: 20px;
    color: #FC4141;
  }
  .mine_shop span{
    color: #FC4141;
    display: inline-block;
    margin-left: 10px;
    font-size: .3rem;
    font-weight: bold;
    line-height: 1.2rem;
  }
  .mine_shop a{
    position: absolute;
    right: 10px;
    top: 20px;
    font-size: .3rem;
    color: #000;
  }
  .mine_nav {
    width: 100%;
    height: 1.4rem;
    
  }
  .mine_nav ul{
    display:flex; 
    text-align: center;
  }
  .mine_nav ul li i{
    display: block;
    font-size: .5rem;
    margin-top: 10px;
  }
  .mine_nav ul li:nth-child(4){
    border-right: 1px solid #ccc;
  }
  .mine_nav ul li{
    flex:1;
  }
  .mine_list{
    margin-top: 10px;
  }
  .mine_list ul li{
    line-height: 40px;
    border-bottom: .5px solid #ccc;
    position: relative;

  }
  .mine_list ul li i{
    margin-left: 10px;
    padding-right: 10px;
  }
  .mine_list ul li a{
    color: #888;
    position: absolute;
    right: 10px;
    top: 5px;
  }
   .mine_content{
        width: 95%;
        height: auto;
        margin-left: 2%;
        text-align: left;
    }
    .mine_content dl{
        width: 48%;
        height: 200px;
        background: #fff;
        float: left;
        margin-left: 2%;

    }
    .mine_content dl dt img{
        width: 90%;
        height: 60%;
        margin-left: 3%;
        margin-top: 10px;
    }
    .mine_content dl dd p{
      width: 85%;
        height: 36px;
        overflow: hidden;
        margin-left: 5px;
        color: #000;
    }
    .mine_content dl dd span{
         color: red;
         margin-left: 5px;
    }
    .mine_content dl dd i{
        color: red;
        margin-left: 50%;
    }
</style>
