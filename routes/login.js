/**
 * Created by yaoyin on 2016/5/20.
 */
var express = require('express');
var router = express.Router();

var hash = require('../middleware/pass').hash;

/* GET login page. */
router.route('/').get(function(req,res,next){
    next();
},function(req,res,next){
    res.render('login',{});
}).post(function(req,res,next){

    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var checkcode = req.body.checkcode;

    if(!uname){

        res.send({
            msg:'请填写用户名'
        })
    }else if(!upwd){
        res.send({
            msg:'请填写密码'
        })

    }else if(checkcode !== req.session.checkcode && global.checkcodeEnable){
        res.send({
            msg:'请正确填写验证码'
        })

    }
    else{
        User.findOne({name:uname},function(err,doc){
            if(err){ 										//错误就返回给原post处（login.html) 状态码为500的错误
                res.send(500);
            }else if(!doc){
                res.send({
                    msg:'用户不存在'
                })
            }else{
                hash(upwd, doc.salt, function(err, hash){

                    if (err) {
                        res.send(500);
                    }
                    if (hash == doc.hash){
                        req.session.user = doc;
                        res.send(200);
                    }else{
                        req.session.error = "密码错误";
                        res.send(404);
                    }

                });
            }
        });
    }
});
module.exports = router;
