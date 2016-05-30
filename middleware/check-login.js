/**
 * Created by yaoyin on 2016/5/20.
 */
//登陆拦截器
module.exports = function(req, res, next){

    var url = req.originalUrl.toLowerCase();

    if( url.indexOf('home') != -1 && !req.session.user){
        return res.redirect('/login');
    }

    next();
};
