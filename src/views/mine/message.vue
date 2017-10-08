<template>
    <div class="message">
        <masker-layer :isActive="masker_active"></masker-layer> 
        <tips :active="tip_active">{{tip_info}}</tips>
        <header class="head">
            <i class="iconfont icon-back" @click="back"></i>
            <span>收货地址</span>
            <i class="iconfont icon-home"></i>
        </header>
        <section>
            <input type="text" placeholder="收货人姓名" v-model="name">
            <input type="text" placeholder="手机号" v-model="phone">
            <p class="select">
                <select v-model="city">
                    <option value="0" selected="selected">请选择省</option>
                    <option :value="x.name" v-for="x in city_list">{{x.name}}</option>
                </select>
                <select v-model="pro"> 
                    <option value="0" selected="selected">请选择市</option>
                    <option :value="x" v-for="x in pro_list">{{x.name}}</option>
                   
                </select>
            </p>

            <select class="district" v-model="area">
                <option value="0">请选择区</option>
                 <option :value="x" v-for="x in area_list">{{x}}</option>
            </select>
            <input type="text" placeholder="详细地址" v-model="site">
            <span class="default"><i>√</i>设为默认地址</span>
            <button class="save" @click="save">保存</button>
        </section>
      
    </div>
</template>

<script>
import masker from '../../components/loading.vue';
import token from "../../../utils/getcookie.js"
import tips from '../../components/tips.vue'
export default {
    data() {
        return {
            name:"",
            phone:"",
            site:"",
            title:"",
            Show:false,
            city:"",
            city_list:[], 
            pro:"",
            pro_list:[],
            area_list:[],
            area:"",
            masker_active:false,
            tip_active:false,
            tip_info:""
        }
    },
    components: {
      "masker-layer": masker,
      "tips":tips

  },
    watch:{
        city:function(newv){
             this.city_list.forEach((v,i)=>{ 
                if(v.name == newv){
                    this.pro_list = v.city;                
                }
            })  
        },
        pro:function(newy){ 
           this.pro_list.forEach((v,i)=>{
            if(v.name == newy.name){
                    this.area_list = v.area;
                }
            })
            //console.log(this.area_list)
        }
    },
    created(){

        this.masker_active=true;
        this.$http.post("/get_address_info").then((res)=>{
                this.city_list =  res.data;
                console.log(res.data)
                
        })
        setTimeout(()=>{
             this.masker_active=false;
        },2000)
       
    },
    methods: {
        back() {
            history.go(-1)
        },
        tips(info){
            this.tip_active=true
            setTimeout(()=>{
                this.tip_active=false
            },300)
            this.tip_info=info
        },
        save(){
            let reg_phone=/^1[34578]\d{9}$/;
            let str="";
            if(!this.name){
               this.tips("请输入姓名") 
               return
            }
            if(!this.phone || !reg_phone.test(this.phone)){
                this.tips("请输入正确的手机号");
                return
             
            }
    
            if(!this.city){
                 this.tips("请输入省份");
                return
            }
            if(!this.pro){
                this.tips("请输入城市");
                return 
            }
            if(!this.area){
                 this.tips("请输入区域");
                return
            }
            if(!this.site){
                 this.tips("请输入街道");
                return
            }
            this.$router.push("/site")
   

            this.$http.post("/add_new_address",{
                name:this.name,
                phone:this.phone,
                pro:this.pro,
                city:this.city,
                area:this.area,
                site:this.site,
                token:token
            }).then((res)=>{
                console.log(res)
            })
           /* this.$http.post("/get_address_info")*/


           
        },
        dialog(){
              this.Show = true;
                setTimeout(() => {
                    this.Show = false;
                },1500)
        }
    }
}
</script>

<style scoped>
input{
    outline:none;
}
.dia{
    position: absolute;
    top:40%;
    left:20%;
}
.default{
    display: block;
    padding-left:.3rem;
    margin-top:.3rem;
}
.default i{
    font-style: normal;
    display: inline-block;
    width:.5rem;
    height: 0.5rem;
    line-height: .5rem;
    text-align: center;
    border:1px solid #ccc;
    border-radius:50%;
    margin-right:.2rem;
    color:#fff;
    background:red;
}
.save{
    width:60%;
    height:.8rem;
    background: red;
    border:none;
    border-radius:.45rem;
    color:#fff;
    font-size: .32rem;
    margin-left: 20%;
    margin-top:.6rem;
    outline: none;
}
.message {
    width: 100%;
    height: 100%;
    background: #eee;
}

.head {
    width: 100%;
    height: .85rem;
    background: #fff;
    line-height: .85rem;
    display: flex;
    justify-content: space-between;
    padding: 0 .3rem;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    background: #fff;
}

.icon-home {
    display: inline-block;
    width: .6rem;
    height: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: .6rem;
    margin-top: 5px;
}

section {
    width: 100%;
}

input {
    width: 92%;
    background: #fff;
    border: none;
    height: .8rem;
    margin-left: 5%;
    margin-top: .3rem;
    padding-left: .2rem;
}

select {
    width: 40%;
    height: .7rem;
    border: none;
    padding-left:.2rem;
}
.select{
    display:flex;
    justify-content: space-between;
    padding:0 .3rem;
    margin-top:.28rem;
}
.district{
    width:90%;
    margin-left:5%;
    margin-top:.28rem;
}
</style>
