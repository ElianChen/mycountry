var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var MemcachedStore = require('connect-memcached')(session);


global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");
global.checkcodeEnable = false; //是否启用验证码

//var basicAuth = require('basic-auth-connect');

// 视图引擎设置 开始

var engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");

// 视图引擎设置 结束

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: 'CatOnKeyboard',
    key: 'test',
    proxy   : 'true',
    store: new MemcachedStore({
        hosts: ['127.0.0.1:11211'],
        // Optionally use transparent encryption for memcache session data
        secret: '123, easy as ABC. ABC, easy as 123'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(basicAuth('name', 'pwd'));


//路由
var routes = require('./routes/entry');
routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      var status = err.status || 500;

      //post时，res.render方法《不会》渲染页面。 get时，res.render方法《会》渲染页面。
      var method = req.method.toLowerCase();



      if(method === 'get'){

          // res.writeHead(status, {'Content-Type': 'text/plain; charset=utf8'});//报错

          res.status(status).render('error', {
              message: err.message,
              error: err
          });

      }else{

          res.writeHead(status, {'Content-Type': 'text/plain; charset=utf8'});//解决接口返回的数据乱码

          res.end(JSON.stringify({
              message: err.message,
              err: err
          }))
      }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
