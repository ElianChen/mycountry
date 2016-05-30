/**
 * Created by yaoyin on 2016/5/24.
 */
//验证码

//    cmd执行 npm docs ccap查看文档

var express = require('express');
var router = express.Router();

var ccap = global.checkcodeEnable && require('ccap');

router.get('/', function(req, res, next){

    if(!global.checkcodeEnable){
        res.end(500);
    }
    var checkcode = Math.random().toString().slice(2, 6);

    var captcha = ccap({
        width: 150,
        fontsize:35,
        height:40,
        //offset:5,
        generate: function () {
            //验证码文本
            return checkcode;
        }
    });

    var ary = captcha.get(); // ary[0] 文本，  ary[1] 图片

    req.session.checkcode = checkcode;

    res.end(ary[1]);

    /*setTimeout(function(){

       /!* 不管是否使用memcache，都需要使用定时器，原因是：
        页面初始加载时，执行了checkcode的get路由，但在登陆时，req.session.checkcode为undefined。
        在刷新验证码后，再登陆时，req.session.checkcode为正确的值。

        另一种解法是：不使用定时器，验证码的src属性不在res.send中渲染，而在页面加载完成后通过前端js去设置src。
        *!/

        req.session.checkcode = checkcode;

        res.end(ary[1]);

    },300);*/


});
module.exports = router;