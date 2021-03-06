import axios from 'axios'
import AxiosAdapter from 'axios-mock-adapter'

function random(min, max) {
    return Math.floor(Math.random() * (max - min)+1)+min
}

function delay(data) {
    return function(){
        return new Promise(function (resolve, reject) {
            let timer = setTimeout(() => {
                resolve([200, data])
                clearTimeout(timer)
            }, random(0, 3500))
        })
    }
}
function delay2(data){
    return new Promise(function (resolve, reject) {
        let timer = setTimeout(() => {
            resolve([200, data])
            clearTimeout(timer)
        }, random(0, 3500))
    })
}

let mocker = new AxiosAdapter(axios);

//首页商品列表
import getGoodsChannel1 from '../service/goodsChannel.json';
import getGoodsChannel2 from '../service/goodChannel2.json';
mocker.onPost('/mall/index/getGoodsChannel').reply(config=>{
    let data = JSON.parse(config.data);
    let channel_id = data.channel_id;
    let res;
    switch (channel_id){
        case 1: res=delay2(getGoodsChannel1);
        break;
        case 2:res = delay2(getGoodsChannel2);
        break;
        case 3:res = delay2(getGoodsChannel2);
        break;
    }
    return res;
});


//添加购物车
import addCart from '../service/addCart.json';
mocker.onPost('/user/Cart/addCart', { key_code: 123, goods_id: 123 }).reply(200, addCart)

//请求分类页的数据
import catagory from '../service/catagory.json';
mocker.onPost('/h5/mtop.relationrecommend.wirelessrecommend.recommend').reply(delay(catagory))

//注册与登录
//验证码获取
mocker.onPost('/verifycode').reply(function(config){
    let phone = JSON.parse(config.data).pn;
    return [200,phone.slice(-4)]
})

mocker.onPost('/register').reply(function(config){
    let register_info = JSON.parse(config.data)

    let ls = localStorage;
    
    let register_history=[];
    if(!ls.getItem('register-info')){
        register_history.push(register_info)
    }else{
        register_history = JSON.parse(ls.getItem('register-info'));
        register_history.push(register_info)
    }

    ls.setItem('register-info',JSON.stringify(register_history))


    return [200,'success']
})



mocker.onPost('/login').reply(config=>{
    let login_info = JSON.parse(config.data)
    console.log(login_info);
    let ls = localStorage;
    let register_history = JSON.parse(ls.getItem('register-info'));
    let is_right= false;
    register_history.forEach((item,index)=>{
        if(item.phone_number===login_info.phone && item.password===login_info.password){
            is_right = true
        }
    })

    if(is_right){
        return [200,{
            tocken:login_info.phone
        }]
    }else{
        return [500,'登录信息有误']
    }
    
    
})

//请求城市渲染数据


//请求全国省份城市信息
import address_info from '../service/address.json';
mocker.onPost('/get_address_info').reply(delay(address_info))


//新加邮寄地址 
mocker.onPost("/add_new_address").reply(config=>{
    let params=JSON.parse(config.data) //{name: "zyh", phone: "18810457112", pro: {…}, city: "北京", area: "x", …}
    let ls=localStorage
    if(ls.getItem("address-list")){
        let add_list=JSON.parse(ls.getItem("address-list"));
        add_list[params.token].push(params)
        ls.setItem("address-list",JSON.stringify(add_list))
    }else{
        let obj={}
        obj[params.token]=[params]
        ls.setItem("address-list",JSON.stringify(obj))
    }
    return [200,1]
})

//请求邮寄地址列表

mocker.onGet("/get_address_list").reply(config=>{
    //console.log(config.data)
    let token=config.data
    console.log(config)
    let ls=localStorage
    let add_list=JSON.parse(ls.getItem("address-list"));
    //console.log(config)
   return [200,add_list[token]]
})






