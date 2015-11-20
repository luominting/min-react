var $ = require('jquery');
// 前端校验
var util = {};

util.verify = {
    checkNull: function(val){
        return String(val)
    },
    checkPhone: function(val){
        var reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(val)
    },
    checkPasword: function(val){
        var reg = /^.{6,12}$/
        return reg.test(val)
    },
    checkname: function(val){
        var reg = /^.{2,16}$/
        return reg.test(val)
    },
    checkEmail: function(val){
        var reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/
        return reg.test(val)
    }
}

util.ajax = {
    checkPhone: function(value){
        //验证手机是否已经注册
        var result;
        $.ajax({
            url: '/robo/api/web_checkPhone.php',
            type:'POST',
            async: false,
            data:{
                phone:value,
            },
            success:function(data){
                result = data;              
            },
            error:function(){
                alert('服务器错误');
            }
        });
        return result; 
    },
    checkEmail: function(value){
        //验证邮箱是否已经注册
        var result;
        $.ajax({
            url:'/robo/api/web_checkEmail.php',
            type: 'POST',
            async:false,
            data:{
                'email':value
            },
            success: function(data){
                result = data;
            },
            error:function(){
                alert('服务器错误');
            }
        })
        return result;
    }
}
module.exports = util;
