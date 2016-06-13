/**
 * Created by yaoyin on 2016/5/31.
 */
'use strict';

var index = require('./index');
var home = require('./home');
var register = require('./register');
var login = require('./login');
var logout = require('./logout');
var users = require('./users');
var channel = require('./channel');

var notFound404 = require('./404');

var user_api = require('../api/user');
var checkcode = require('../api/checkcode');

var checkLogin = require('../middleware/check-login');



module.exports = function (app) {
    
    app.all('*', function (req, res, next) {
        next()
    });

    app.use('/', index);
    app.use('/users', users);
    app.use('/login',login);

    app.use('/register',register);


    app.use('/home',
        checkLogin,
        function(req,res,next){
            res.locals.user = req.session.user;
            next();
        },
        home);
    app.use('/logout',logout);

    app.use('/channel',channel);

    app.use('/404',notFound404);


    app.use("/api/user",user_api);
    app.use('/verification/image',checkcode);  
};
