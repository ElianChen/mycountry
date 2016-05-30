/**
 * Created by yaoyin on 2016/5/20.
 */
var express = require('express');
var router = express.Router();
/* GET register page. */
router.route("/").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("register",{title:'User register'});
}).post(function(req,res){
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){
        if(err){
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{

            var hash = require('../middleware/pass').hash;
            hash(upwd, function(err, salt, hash){
                if(err){
                    req.session.error = '密码加密错误';
                    res.send(500);
                }else{
                    User.create({ 							// 创建一组user对象置入model
                        name: uname,
                        salt: salt,
                        hash: hash,
                        password: upwd
                    },function(err,doc){
                        if (err) {
                            req.session.error = '写入数据库错误';
                            res.send(500);
                        } else {
                            req.session.error = '用户名创建成功！';
                            res.send(200);
                        }
                    });
                }


            })
        }
    });
});
module.exports = router;
