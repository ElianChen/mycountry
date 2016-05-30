/**
 * Created by yaoyin on 2016/5/24.
 */

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var page = require('../middleware/page');

var User = global.dbHandel.getModel('user');

/*所有用户 开始*/
router.get('/',function(req, res, next){

    User.find({},function(err,doc){
        if(err){
            next(new Error('网络异常错误'));
        }else if(doc && doc.length > 0){
            res.send(_.map(doc,function(obj){
                return {
                    name: obj.name,
                    password: obj.password
                }
            }));
        }else{
            next(new Error('没有用户'));
        }

    });
});
/*所有用户 结束*/

/*指定名字的用户 开始*/
router.get('/:name',function(req,res,next){

    var uname = req.params.name;

    User.findOne({name: uname},function(err,doc){
        if(err){
            next(new Error('网络异常错误'));
        }else if(doc){
            res.send(JSON.stringify({
                name:doc.name,
                password:doc.password
            }));
        }else{
            next(new Error('用户名不存在'));
        }

    });
});
/*指定名字的用户 结束*/


/*用户分页 开始*/
function userTotal(cb){
    User.count({},cb);
}

function userContent(cb){
    User.find({},cb);
}

router.get('/page/info',page.set({perpage:3}),page.info(userTotal),function(req, res, next){
    //todo 启动node时，即使没调用该api，page.info也会执行，可能是因为它的返回值才是中间件
    res.send(res.locals.page);
});

router.get('/page/content/:page',page.set({perpage:6}),page.content(userContent),function(req, res, next){
    //console.log('req.originalUrl:%s',req.originalUrl);   /*/api/user/page/content/1*/
    //console.log('req.baseUrl:%s',req.baseUrl); /*/api/user*/
    //console.log('req.path:%s',req.path); /*/page/content/1*/
    res.send(res.locals.results);
});

/*用户分页 结束*/

module.exports = router;